import { api } from "./api";

export const SignIn = (email: string, password: string) =>
  api.post<User>({ url: "/api/signin", body: { email, password } });
export const Register = (nickName: string, email: string, password: string) => {
  api.post<User>({ url: "/api/register", body: { nickName, email, password } });
};
export const GetUser = () => api.get<User>({ url: "/api/getUser" });
export const LogOut = (email: string, password: string) =>
  api.post<User>({ url: "/api/logout", body: { email, password } });
