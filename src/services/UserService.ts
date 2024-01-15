import axios, { AxiosResponse } from 'axios';
const BASE_URL = 'http://127.0.0.1:537/user';

export default class UserService {
  static async getUserById(userId: string): Promise<AxiosResponse<any>> {
    const response = await axios.get(`${BASE_URL}/get-user-by-id`, {
      params: {
        userId,
      },
    });

    return response;
  }
}
