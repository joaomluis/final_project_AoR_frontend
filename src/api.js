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
  signin: (email, password) => apiClient.post("/users/login", { email, password }).then(handleResponse).catch(handleError),
  signout: (token) =>
    apiClient
      .post("/users/logout", {}, { headers: { token: token } })
      .then(handleResponse)
      .catch(handleError),
};
