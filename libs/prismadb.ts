import { PrismaClient } from "@prisma/client";

//обявлени глобальной переменной для всего приложения что бы не делать ипорты и был доступ

declare global{
    var prisma: PrismaClient| undefined
}

//Если первое подключенеи то создать новый обект если старое то использовать старое 
const client = globalThis.prisma || new PrismaClient();

//Ели не выбран режим продакшена то использовать клиент который выше
if(process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client

// это надо что бы была возможность модифицировать клиент призмы на разныъ уровнях работы
// globalThis - обращенеи к глобальным пеерменным
// declare global - созданеи новых глобальных пременных