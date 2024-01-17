import instance from "./apiInstance";

const authApi = {
  login: async (credentials) => {
    try {
      const response = await instance.post("auth/login", credentials);
      return response.data;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  },

  googleLogin: async (credentials) => {
    try {
      const response = await instance.post("auth/google-login", credentials);
      return response.data;
    } catch (error) {

      throw error?.response?.data?.message;
    }
  },

  register: async (credential) => {
    try {
      const response = await instance.post("auth/register", credential);
      return response.data;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  },

  recoverPassword: async (credential) => {
    try {
      const response = await instance.post("auth/forgot-password", credential);
      return response.data;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  },

  verifyPassword: async (credential) => {
    try {
      const response = await instance.post("auth/verify-password", credential);
      return response.data;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  },
};

export default authApi;
