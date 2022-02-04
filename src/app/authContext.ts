import { createContext } from "react";
import { IUser } from "./backend";

export const userContext = createContext<IUser>({
  name: "User",
  email: ""
});