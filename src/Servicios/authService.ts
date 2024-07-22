import axios from 'axios';

const API_URL = 'https://burger-queen-api-mock-production-2cd9.up.railway.app/login'; // URL corregida

interface LoginResponse {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post(API_URL, { email, password });
  return response.data;
};
