import axios from "axios";

const BASE_URL = "http://localhost:8080/innovationLab/rest/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleResponse = (response) => ({
  data: response.data,
  status: response.status,
});

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
  signin: (email, password) =>
    apiClient
      .post("/users/login", { email, password })
      .then(handleResponse)
      .catch(handleError),
  signup: (registerUser) =>
    apiClient
      .post("/users", registerUser)
      .then(handleResponse)
      .catch(handleError),
  signout: (token) =>
    apiClient
      .post("/users/logout", {}, { headers: { token: token } })
      .then(handleResponse)
      .catch(handleError),
  forgotPassword: (email) =>
    apiClient
      .post(`/users/reset-password/${email}`, {})
      .then(handleResponse)
      .catch(handleError),
  confirmAccount: (token, data) =>
    apiClient
      .post("/users/confirm-account", data, { headers: { token: token } })
      .then(handleResponse)
      .catch(handleError),
  changePassword: (token, data) =>
    apiClient
      .post(`/users/change-password`, data, { headers: { token: token } })
      .then(handleResponse)
      .catch(handleError),
  getUser: (token, email) =>
    apiClient
      .get("/users", { headers: { token }, params: { email } })
      .then(handleResponse)
      .catch(handleError),

  //LOCATION endpoints
  getAllLocations: (token) =>
    apiClient
      .get("/labs", { headers: { token } })
      .then(handleResponse)
      .catch(handleError),

  //SKILL endpoints
  addSkill: (token, data) =>
    apiClient
      .post("/skills", data, { headers: { token } })
      .then(handleResponse)
      .catch(handleError),
  removeSkill: (token, data) =>
    apiClient
      .put("/skills", data, { headers: { token } })
      .then(handleResponse)
      .catch(handleError),
  getSkillType: (token) =>
    apiClient
      .get("/skills/types", { headers: { token } })
      .then(handleResponse)
      .catch(handleError),
  getAllSkills: (token) =>
    apiClient
      .get("/skills", { headers: { token } })
      .then(handleResponse)
      .catch(handleError),
  getUserSkills: (token, email) =>
    apiClient
      .get("/skills", {
        headers: { token },
        params: { userEmail: email },
      })
      .then(handleResponse)
      .catch(handleError),

  //INTEREST endpoints
  addInterest: (token, data) =>
    apiClient
      .post("/interests", data, { headers: { token } })
      .then(handleResponse)
      .catch(handleError),
  removeInterest: (token, data) =>
    apiClient
      .put("/interests", data, { headers: { token } })
      .then(handleResponse)
      .catch(handleError),
  getAllInterests: (token) =>
    apiClient
      .get("/interests", { headers: { token } })
      .then(handleResponse)
      .catch(handleError),
  getUserInterests: (token, email) =>
    apiClient
      .get("/interests", {
        headers: { token },
        params: { userEmail: email },
      })
      .then(handleResponse)
      .catch(handleError),

  //IMAGE endpoints
  uploadImage: (token, file, filename) => {
    // Criar um Blob para enviar como binário
    const formData = new FormData();
    formData.append("file", file, filename);

    // Extrair o Blob do FormData
    const imageData = formData.get("file");
    return apiClient
      .post("/images/user", imageData, {
        headers: {
          "Content-Type": file.type,
          token: token,
          filename: filename,
        },
      })
      .then(handleResponse)
      .catch(handleError);
  },
};
