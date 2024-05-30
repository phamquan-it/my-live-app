import axiosAuth from "@/pages/api/axiosClient";
import { register } from "module";

export interface LoginPayload {
  email: string;
  password: string;
}
export interface RegisterPayload {
    name: string,
    email: string;
    password: string;
    confirmpassword:string
  }
export interface InfoPayload{
    name: string,
    idRole: number,
    type: string,
    old_password: string,
    new_password: string,
    ratio: number
  }
export const authApi = {
  login(payload: LoginPayload) {
    return axiosAuth.post(`/auth/login?language=en`, payload);
  },
  register(payload:RegisterPayload){
    return axiosAuth.post("/auth/register?language=en",payload)
  },
  logout() {
    return axiosAuth.post('/auth/logout');
  },
  update_info(id_user:string, infoPayload: InfoPayload){
    return axiosAuth.patch(`/user/update/${id_user}?language=en`,infoPayload)
  },
  get_user_info(){
    return axiosAuth.get("/user/info?language=en")
  },
  refreshToken(refresh_token: string) {
    return axiosAuth.post('/auth/refresh-token', {
      refresh_token,
    });
  }
};