"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerSchema } from "@/utils";

import {
  TextField,
  LoginBtn,
  HandleResponse,
  RedirectToLogin,
  ResponsiveImage,
} from "@/components";

import { useTranslate } from "@/hooks";

import { useCreateUserMutation } from "@/store/services";
import { useDispatch } from "react-redux";
import { userLogin } from "@/store";

import { useDisclosure } from "@/hooks";

export default function RegisterPage() {
  const trans = useTranslate()
  //? Assets
  const [isShowRedirectModal, redirectModalHandlers] = useDisclosure();
  const dispatch = useDispatch();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  //? Create User
  const [createUser, { data, isSuccess, isError, isLoading, error }] = useCreateUserMutation();

  //? Form Hook
  const {
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    setFocus,
    control,
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: "", email: "", phone: "", user_name: "", password: "", confirmPassword: "" },
  });

  //? Focus On Mount
  useEffect(() => {
    setFocus("name");
  }, []);

  //? Handlers
  const submitHander = async ({ name, user_name, email, phone, password, confirmPassword }) => {
    if (name && user_name && email && phone && password && confirmPassword) {
      await createUser({
        body: { name, phone, email, user_name, password },
      });
    }
  };

  const onError = () => {
    if (error.status === 422) {
      redirectModalHandlers.open();
    }
  };

  const onSuccess = () => {
    dispatch(userLogin(data.data.token));
    reset();
    replace(redirectTo || "/");
  };

  return (
    <>
      <RedirectToLogin
        title={trans.auth.register_now}
        text={error?.data?.message}
        onClose={redirectModalHandlers.close}
        isShow={isShowRedirectModal}
      />
      {/*  Handle Login Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message}
          message={data?.message}
          onSuccess={onSuccess}
          onError={onError}
        />
      )}
      <main className="grid items-center min-h-screen bg-shalom-orange-100">
        <section className="container bg-white max-w-md px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow">
          <Link passHref href="/">
            <ResponsiveImage
                dimensions="mx-auto w-48 h-24"
                className="overflow-hidden"
                src="/logo-htshalom.png"
                alt={`HT Shalom`}
              />
          </Link>
          <h1>
            <font className="">
              <font>{trans.auth.register}</font>
            </font>
          </h1>
          <form
            className="space-y-4"
            onSubmit={handleSubmit(submitHander)}
            autoComplete="off"
          >
            <TextField
              errors={formErrors.name}
              placeholder={trans.auth.name}
              name="name"
              control={control}
            />
            <TextField
              errors={formErrors.email}
              placeholder={trans.auth.email}
              name="email"
              control={control}
            />
            <TextField
              errors={formErrors.phone}
              placeholder={trans.auth.phone}
              name="phone"
              control={control}
            />
            <TextField
              errors={formErrors.user_name}
              placeholder={trans.auth.user_name}
              name="user_name"
              control={control}
            />
            <TextField
              errors={formErrors.password}
              type="password"
              placeholder={trans.auth.password}
              name="password"
              control={control}
            />
            <TextField
              control={control}
              errors={formErrors.confirmPassword}
              type="password"
              placeholder={trans.auth.password_confirm}
              name="confirmPassword"
            />
            <LoginBtn isLoading={isLoading}>{trans.auth.register}</LoginBtn>
          </form>
          <div className="text-xs">
            <p className="inline mr-2 text-gray-800 text-xs">
              {trans.auth.have_an_account}
            </p>
            <Link href="/login" className="text-blue-400 text-xs">
              {trans.auth.login}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
