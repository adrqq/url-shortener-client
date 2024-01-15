import axios, { AxiosResponse } from "axios";
import $api from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
const BASE_URL = 'http://localhost:5075';


export default class AuthService {
  static async login(Email: string, Password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/api/account/login', {
      Email,
      Password,
    });
  }

  static async register(Email: string, Password: string, Nickname: string, AdminCredentials: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/api/account/register', {
      Nickname,
      Email,
      Password,
      AdminCredentials: AdminCredentials,
    });
  }

  static async sandActivationMail(email: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/send-activation-link', {
      email,
    });
  }

  static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
    const response = await axios.get<AuthResponse>(`${BASE_URL}/api/account/refresh`, { withCredentials: true });

    return response;
  }

  static async logout(): Promise<AxiosResponse<AuthResponse>> {
    const response = await axios.post<AuthResponse>(`${BASE_URL}/api/account/logout`, null, { withCredentials: true });

    return response;
  }
}