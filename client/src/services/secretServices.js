import instance from "./apiInstance";

const secretApi = {
  postSecret: async (payload) => {
    try {
      const response = await instance.post("/post-secret", payload);
      return response.data;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  },
  getAllSecrets: async () => {
    try {
      const response = await instance.get("/get-all-secrets");
      return response.data;
    } catch (error) {
      // Handle error, e.g., show an error message to the user
      throw error?.response?.data?.message;

    }
  },
};
 export default secretApi