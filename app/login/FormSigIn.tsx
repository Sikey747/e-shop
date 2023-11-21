"use client";

import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Alert } from "@mui/material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

interface FormSigInProps {
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string().email("Not correct email"),
  password: z.string().min(8, { message: "Min 8 symbols" }),
});

export default function FormSigIn({}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarError, setSnackbarError] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
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
    setIsLoading(true);
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
      .then((callback) => {
        if (callback && !callback.error) {
          reset();
          router.push("/shopCard");
          router.refresh();
        }
        if (callback?.error) {
          handleCloseSnecbarError();
        }
      })
      .catch(() => handleCloseSnecbarError())
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-6 px-6"
      >
        <Button
          onClick={() => {
            signIn("google");
                router.push("/shopCard");
                router.refresh();
          }}
        >
          <FaGoogle size={24} />
          Register with Google
        </Button>
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

        <Button type="submit" className="mx-auto">
          {isLoading ? "Loading..." : "Sig In"}
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
          className="text-white"
          severity="error"
          onClose={handleCloseSnecbarError}
          sx={{ width: "200%", backgroundColor: "red", color: "white" }}
        >
          Error!
        </Alert>
      </Snackbar>
    </>
  );
}
