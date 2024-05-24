import axios from "axios";

const BASE_URL = "http://localhost:8080/innovationLab/rest/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleResponse = (response) => ({ data: response.data, status: response.status });

const handleError = (error) => {
  if (error.response) {
    let errorMessage = "Something went wrong";
    if (typeof error.response.data === "string") {
      errorMessage = error.response.data;
    } else if (error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    const err = new Error(errorMessage);
    err.status = error.response.status;
    throw err;
  } else {
    const err = new Error("Network Error");
    err.status = null;
    throw err;
  }
};

export const Api = {
  //USER endpoints
  signin: (email, password) => apiClient.post("/users/login", { email, password }).then(handleResponse).catch(handleError),
  signup: (registerUser) => apiClient.post("/users", registerUser).then(handleResponse).catch(handleError),
  signout: (token) =>
    apiClient
      .post("/users/logout", {}, { headers: { token: token } })
      .then(handleResponse)
      .catch(handleError),
  forgotPassword: (email) => apiClient.post(`/users/reset-password/${email}`, {}).then(handleResponse).catch(handleError),
  confirmAccount: (token, data) =>
    apiClient
      .post("/users/confirm-account", data, { headers: { token: token } })
      .then(handleResponse)
      .catch(handleError),
  changePassword: (password, confirmPassword, token) =>
    apiClient
      .post(`/users/change-password`, { password, confirmPassword }, { headers: { token: token } })
      .then(handleResponse)
      .catch(handleError),

  //LOCATION endpoints
  getAllLocations: (token) => apiClient.get("/labs", { headers: { token } }).then(handleResponse).catch(handleError),
};
