"use client";

import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Alert } from "@mui/material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

interface FormSigInProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = z
  .object({
    name: z.string().trim().min(3, { message: "Min 3 symbols" }),
    email: z.string().trim().email("Not correct email"),
    password: z.string().trim().min(8, { message: "Min 8 symbols" }),
    confirmPassword: z.string().trim().min(8, { message: "Min 8 symbols" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function FormRegister({}) {
  const router = useRouter();
  const [isLoading,setIsLoading] = useState(false)
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarError, setSnackbarError] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const handleCloseSnecbar = () => {
    setSnackbar(!snackbar);
  };
  const handleCloseSnecbarError = () => {
    setSnackbarError(!snackbarError);
  };

  const onSubmit: SubmitHandler<FormSigInProps> = (data) => {
    setIsLoading(true)
    const sendData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    axios
      .post("/api/register", sendData)
      .then(() => {
        signIn("credentials", {
          email: sendData.email,
          password: sendData.password,
          redirect: false,
        }
        ).then((callback) => {
                  console.log(1);
        
          if (callback && !callback.error) {
            handleCloseSnecbar();
            reset();
            router.push("/shopCard");
            router.refresh();
          }
          if (callback?.error) {
            handleCloseSnecbarError();
          }
        });
      })
      .catch(() => handleCloseSnecbarError())
      .finally(()=>{setIsLoading(false)});
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-6 px-6"
      >
        <Button onClick={() => {
          signIn("google")
              router.push("/shopCard")
              router.refresh()}}>
          <FaGoogle size={24} />
          Continue with Google
        </Button>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              type="name"
              placeholder="Name"
              onChange={(e) => field.onChange(e)}
              value={field.value}
              error={!!errors.name?.message}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => field.onChange(e)}
              value={field.value}
              error={!!errors.email?.message}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => field.onChange(e)}
              value={field.value}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => field.onChange(e)}
              value={field.value}
              error={!!errors.confirmPassword?.message}
              helperText={errors.confirmPassword?.message}
            />
          )}
        />

        <Button disabled={isLoading} type="submit" className={`mx-auto`}>
          Sig In
        </Button>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnecbar}
      >
        <Alert
          className="text-white"
          onClose={handleCloseSnecbar}
          sx={{ width: "200%", backgroundColor: "green", color: "white" }}
        >
          Success!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarError}
        autoHideDuration={5000}
        onClose={handleCloseSnecbarError}
      >
        <Alert
          severity="error"
          className="text-white"
          onClose={handleCloseSnecbarError}
          sx={{ width: "200%", backgroundColor: "red", color: "white" }}
        >
          Error!
        </Alert>
      </Snackbar>
    </>
  );
}
