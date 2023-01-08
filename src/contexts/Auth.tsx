import { useState, useMemo, useEffect, createContext } from "react";

type AuthContextProps = {
  token: string;
  isAuthenticated: boolean;
  saveToken: Function;
  clearToken: Function;
};

const TOKEN = "access_token";

export const AuthContext = createContext<AuthContextProps>({} as any);

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  const [init, setInit] = useState(false);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      setToken(token);
    }

    setInit(true);
  }, []);

  const value = useMemo(() => {
    return {
      token,
      isAuthenticated: !!token,
      saveToken: (token: string) => {
        setToken(token);
        localStorage.setItem(TOKEN, token);
      },
      clearToken: () => {
        setToken("");
        localStorage.clear();
      },
    };
  }, [token]);

  return init ? (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  ) : null;
};
