import axios from "axios";

const BASE_URL = "http://localhost:8080/innovationLab/rest/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleResponse = (response) => response.data;

const handleError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.message || "Something went wrong");
  } else {
    throw new Error("Network Error");
  }
};

export const Api = {
  //USER endpoints
  signin: (email, password) => apiClient.post("/users/login", { email, password }).then(handleResponse).catch(handleError),
  signup: (email, password) => apiClient.post("/users", { email, password }).then(handleResponse).catch(handleError),
  signout: (token) =>
    apiClient
      .post("/users/logout", {}, { headers: { token: token } })
      .then(handleResponse)
      .catch(handleError),
  forgotPassword: (email) => apiClient.post(`/users/reset-password/${email}`, {}).then(handleResponse).catch(handleError),
  confirmAccount: (token, data) => apiClient.post(`/users/confirm-account/${token}`, data).then(handleResponse).catch(handleError),
  changePassword: (password, confirmPassword, token) =>
    apiClient
      .post(`/users/change-password`, { password, confirmPassword }, { headers: { token: token } })
      .then(handleResponse)
      .catch(handleError),

  //LOCATION endpoints
  getAllLocations: (token) => apiClient.get("/labs", { headers: { token } }).then(handleResponse).catch(handleError),
};
