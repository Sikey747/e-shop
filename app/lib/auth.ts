import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import  { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma  from "../../libs/prismadb";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // profile(profile){
      //   return{
      //     id:profile.sub,
      //     name:profile.name,
      //     email:profile.email,
      //     image:profile.picture,
      //     role:profile.role ?? 'user'
      //   }
      // }
    }),
    CredentialsProvider({
      //мы получаем данные которрые ввел пользователь после валидации с формы
      name: "creatials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      //проверям то что ввел пользователь с тем что есть в базе данных
      async authorize(credentials) {
        // Проверка наличия email и password в переданных учетных данных
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid email or password");
        }
        // Поиск пользователя в базе данных по email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        // Проверка наличия пользователя и хешированного пароля
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid email or password");
        }
        // Сравнение пароля из учетных данных с хешированным паролем пользователя
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );
        // Если пароль неверный, выбрасывается ошибка
        if (!isCorrectPassword) {
          throw new Error("Invalid email or password");
        }

        // Возвращается объект пользователя
        return user;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
