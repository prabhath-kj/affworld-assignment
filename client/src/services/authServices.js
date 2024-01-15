import instance from "./apiInstance";

const authApi = {
  login: async (credentials) => {
    try {
      const response = await instance.post("auth/login", credentials);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  googleLogin: async (credentials) => {
    try {
      const response = await instance.post("auth/googleLogin", credentials);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  logout: async () => {
    try {
      const response = await instance.post("auth/logout");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authApi;
