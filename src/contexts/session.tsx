import React, { useState } from "react";
import { HttpResponse, HttpService } from "services/httpService";
import { LoginForm } from "types/LoginForm";
import { User } from "types/User";
import { parseCookies, setCookie, destroyCookie } from "nookies";

type SessionProviderType = {
  children: React.ReactNode;
};

type SessionContextType = {
  handleLogin: (
    form: LoginForm,
    setResponse: (response: string) => void,
    navigate: (path: string) => void
  ) => void;
  httpService: HttpService | null;
  checkLogin: () => Promise<boolean>;
  logout: (navigate: (path: string) => void) => void;
};

const SessionContext = React.createContext<SessionContextType>(null as any);

export const SessionProvider: React.FC<SessionProviderType> = ({
  children,
}) => {
  const [httpService, setHttpService] = useState<HttpService | null>(null);

  const handleLogin = async (
    loginForm: LoginForm,
    setResponse: (response: string) => void,
    navigate: (path: string) => void
  ) => {
    const httpServiceLocal = new HttpService();
    try {
      const { data, status } = (await httpServiceLocal.post(
        "/auth/login",
        loginForm
      )) as HttpResponse<any>;
      if (status === 401) {
        setResponse("Invalid email or password");
        return;
      }
      if (status === 200) {
        const expirationTime = new Date().getTime() + 5 * 24 * 60 * 60 * 1000;
        setCookie(null, "JWT", data.access_token, {
          maxAge: expirationTime,
          path: "/",
        });
        setHttpService(new HttpService(data.access_token));
        navigate("/products");
      }
    } catch (error: any) {
      console.log("LOGIN ERROR", error.message);
      setResponse("Login failed, please try again");
    }
  };

  const checkLogin = async (): Promise<boolean> => {
    const cookies = parseCookies();
    if (cookies.JWT) {
      const httpServiceLocal = new HttpService(cookies.JWT);

      try {
        const { status } = (await httpServiceLocal.get(
          "/products"
        )) as HttpResponse<any>;
        if (status === 200) {
          setHttpService(httpServiceLocal);
          return true;
        }
        destroyCookie(null, "JWT", { path: "/" });
        return false;
      } catch (error: any) {
        console.log("CHECK LOGIN ERROR", error?.message);
        return false;
      }
    }
    return false;
  };

  const logout = async (navigate: (path: string) => void) => {
    destroyCookie(null, "JWT", { path: "/" });
    setHttpService(null);
    navigate("/login");
  };

  return (
    <SessionContext.Provider
      value={{ handleLogin, httpService, checkLogin, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = React.useContext(SessionContext);

  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};
