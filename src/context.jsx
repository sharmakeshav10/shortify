import { createContext, useContext, useEffect } from "react";
import useFetch from "./hooks/useFetch";
import { getCurrentUser } from "./db/apiAuth";

const UserContext = createContext();

const UserProvider = () => {
  const { data, loading, error, fn: fetchUser } = useFetch(getCurrentUser);

  const isAuthenticated = data?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ data, loading, error, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
