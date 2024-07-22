import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider(children) {
  const [data, setData] = useState();

  return (
    <AuthContext.Provider value={{ data, setData }}>
      {children}
    </AuthContext.Provider>
  );
}
