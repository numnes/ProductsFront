import React, { useState } from "react";
import { User } from "types/User";

type SessionProviderType = {
  children: React.ReactNode;
};

type SessionContextType = {
  loggedUser: User | null;
  setLoggedUser: (user: User | null) => void;
};

const SessionContext = React.createContext<SessionContextType | null>(null);

export const SessionProvider: React.FC<SessionProviderType> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  return (
    <SessionContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </SessionContext.Provider>
  );
};
