import { LoadingButton } from "@mui/lab";
import { Input, Stack, TextField, Typography } from "@mui/material";
import PageWrapper from "components/pageWrapper";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import LogoMyPharma from "assets/images/LogoMyPharma.png";
import { useLayoutSize } from "contexts/hooks/useLayoutSize";

type LoginInputs = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<LoginInputs>();

  const { size } = useLayoutSize();

  const onSubmit: SubmitHandler<LoginInputs> = (data: LoginInputs) => {
    console.log(data);
  };

  const checkIsEmail = (email: string) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  return (
    <PageWrapper
      style={{
        backgroundColor: "var(--hylight-color)",
      }}
    >
      <Stack
        style={{
          flexDirection: "row",
          alignItems: "center",
          color: "white",
        }}
      >
        <img
          src={LogoMyPharma}
          alt="Products"
          style={{
            width: "100px",
          }}
        />
        <Typography
          variant={size === "small" ? "h4" : "h3"}
          style={{ fontWeight: "bolder" }}
        >
          Products List
        </Typography>
      </Stack>
      <Stack
        style={{
          width: size === "small" ? "100%" : "40rem",
          margin: size === "small" ? "0.8rem 0 " : "0rem",
          height: "30rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "var(--round-border)",
          boxShadow: "var(--box-shadow-paper)",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "grid",
            gridTemplateRows: "1fr 2fr",
            gap: "1rem",
            height: "100%",
          }}
        >
          <Stack
            style={{
              width: "100%",
              alignItems: "center",
              padding: "2rem 0px",
            }}
          >
            <Typography variant="h4">Login</Typography>
          </Stack>
          <Stack
            style={{
              gap: "1rem",
            }}
          >
            <Controller
              name={"username"}
              control={control}
              rules={{
                required: true,
                validate: (value) => checkIsEmail(value),
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  onChange={onChange}
                  value={value}
                  fullWidth
                  label={"E-mail"}
                  error={errors.username === null}
                  helperText={errors.username?.message}
                  style={{ width: "20rem" }}
                />
              )}
            />
            <Controller
              name={"password"}
              control={control}
              rules={{ required: true, minLength: 8, maxLength: 20 }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  onChange={onChange}
                  fullWidth
                  value={value}
                  label={"Password"}
                  type="password"
                  error={errors.password === null}
                  helperText={errors.password?.message}
                />
              )}
            />
            <LoadingButton
              style={{ height: "56px" }}
              variant="contained"
              type="submit"
            >
              Login
            </LoadingButton>
          </Stack>
        </form>
      </Stack>
    </PageWrapper>
  );
};

export default Login;
