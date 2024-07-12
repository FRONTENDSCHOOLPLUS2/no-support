import api from '@api/axiosInstance';

export const getAccessToken = async () => {
  return api.get(`/auth/refresh`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
    },
  });
};
