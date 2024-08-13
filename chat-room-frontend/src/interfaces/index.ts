import { RegisterUser } from "@/pages/Register";
import { UserInfo } from "@/pages/UpdateInfo";
import { UpdatePassword } from "@/pages/UpdatePassword";
import { message } from "antd";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3005/",
  timeout: 3000,
});

axiosInstance.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    config.headers.authorization = "Bearer " + accessToken;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const newToken = response.headers["token"];
    if (newToken) {
      localStorage.setItem("token", newToken);
    }
    return response;
  },
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    let { data } = error.response;
    if (data.statusCoed === 401) {
      message.error(data.message);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      return Promise.reject(error);
    }
  }
);

//登录
export async function login(username: string, password: string) {
  return await axiosInstance.post("/user/login", { username, password });
}
//注册验证码
export async function registerCaptcha(email: string) {
  return await axiosInstance.get("/user/register-captcha", {
    params: {
      address: email,
    },
  });
}
//用户注册
export async function register(registerUser: RegisterUser) {
  return await axiosInstance.post("/user/register", registerUser);
}

//更改密码验证码
export async function updatePasswordCaptcha(email: string) {
  return await axiosInstance.get("/user/update_password/captcha", {
    params: {
      address: email,
    },
  });
}
//更改密码
export async function updatePassword(data: UpdatePassword) {
  return await axiosInstance.post("/user/update_password", data);
}

//获取用户信息
export async function getUserInfo() {
  return await axiosInstance.get("/user/info");
}
//更新用户信息
export async function updateInfo(data: UserInfo) {
  return await axiosInstance.post("/user/update", data);
}
//更新用户信息验证码
export async function updateUserInfoCaptcha() {
  return await axiosInstance.get("/user/update/captcha");
}

export async function presignedUrl(fileName: string) {
  return axiosInstance.get(`/minio/presignedUrl?name=${fileName}`);
}
