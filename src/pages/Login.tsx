import { LoadingButton } from "@mui/lab";
import { Stack, TextField, Typography } from "@mui/material";
import PageWrapper from "components/pageWrapper";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LogoMyPharma from "assets/images/LogoMyPharma.png";
import { useLayoutSize } from "contexts/hooks/useLayoutSize";
import { useSession } from "contexts/session";
import { LoginForm } from "types/LoginForm";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  // Hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const { handleLogin, checkLogin } = useSession();
  const { size } = useLayoutSize();
  const navigate = useNavigate();

  // States
  const [loginResponse, setLoginResponse] = React.useState<String>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loginCheck, setLoginCheck] = React.useState<boolean>(false);

  // Effects
  React.useEffect(() => {
    if (loginCheck) return;
    setLoginCheck(true);
    (async () => {
      const logged = await checkLogin();
      if (logged) navigate("/products");
    })();
  });

  // Functions
  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    setLoading(true);
    await handleLogin(data, setLoginResponse, navigate);
    setLoading(false);
  };

  const checkIsEmail = (email: string) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email) || "Email is not valid";
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
            <TextField
              variant="outlined"
              fullWidth
              label={"E-mail"}
              error={errors.username === null}
              helperText={errors.username?.message}
              style={{ width: "20rem" }}
              inputProps={register("username", {
                required: "Please enter e-mail",
                validate: (value) => checkIsEmail(value),
              })}
            />

            <TextField
              variant="outlined"
              fullWidth
              label={"Password"}
              type="password"
              error={errors.password === null}
              helperText={errors.password?.message}
              inputProps={register("password", {
                required: "Please enter password",
              })}
            />
            <LoadingButton
              style={{ height: "56px" }}
              variant="contained"
              type="submit"
              loading={loading}
            >
              Login
            </LoadingButton>
            <Stack>
              <Typography
                variant="body2"
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                {loginResponse}
              </Typography>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </PageWrapper>
  );
};

export default Login;
