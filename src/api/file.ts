import api from '@api/axiosInstance';

export const postFile = async <T>(data: FormData) => {
  return api.post<T>(`/files`, data);
};
