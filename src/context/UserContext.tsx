import { ReactNode, createContext, useEffect, useState } from "react";
import { getWithAuth } from "../api/api";
import Cookies from "js-cookie";
import { toastError } from "../components/Toast/Toast";

interface User {
  userId: string;
  namaLengkap: string;
  email: string;
  role: string;
}

export type UserTypeContext = {
  user: User | null;
};

const defaultValue = {
  user: { userId: "", namaLengkap: "", role: "", email: "" },
};

export const UserContext = createContext<UserTypeContext>(defaultValue);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (user: User) => {
    setUser(user);
  };

  const token = Cookies.get("token_mediguard");
  const getUser = async () => {
    if (token) {
      try {
        const response = await getWithAuth(token, "user/get");
        const data = response.data?.data;
        updateUser({
          userId: data.userId,
          namaLengkap: data.namaLengkap,
          email: data.email,
          role: data.role,
        });
      } catch (error) {
        toastError("Get User Failed");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
