import { createContext } from "use-context-selector";

type ContextType = {
  size: string; // 'small' | 'medium' | 'large';
};

export const Context = createContext({} as ContextType);
