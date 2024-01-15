import axios, { AxiosResponse } from "axios";
import $api from "../http";
// import { AuthResponse } from "../models/response/AuthResponse";
import { ShortUrlModel } from "../models/response/ShortUrlModel";
import { BASE_URL } from "../http";

export default class UrlService {
  static async createUrl(Url: string, Slug: string, Nickname: string): Promise<AxiosResponse<string>> {
    return axios.post<string>(`${BASE_URL}/url/create`, {
      Url,
      Slug,
      Nickname,
    });
  }

  static async getAllRecords(): Promise<AxiosResponse<ShortUrlModel[]>> {
    return axios.get<ShortUrlModel[]>(`${BASE_URL}/url/get-all`);
  }

  static async deleteUrl(url: string): Promise<AxiosResponse<any>> {
    return $api.post<any>('/url/delete-url', {
      url,
    });
  }

  static async fetchAboutText(): Promise<AxiosResponse<string>> {
    return axios.get<string>(`${BASE_URL}/url/about`);
  }

  static async saveAboutText(text: string): Promise<AxiosResponse<string>> {
    return axios.get<string>(`${BASE_URL}/url/about/update`, {
      params: {
        text,
      },
    });
  }
}