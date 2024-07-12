import { User, SignupUserForm } from '#types/user';
import api from '@api/axiosInstance';

export const signupUser = async <T>(data: SignupUserForm) => {
  return api.post<T>(`/users`, data);
};

export const loginUser = async <T>(data: User) => {
  return api.post<T>(`/users/login`, data);
};
