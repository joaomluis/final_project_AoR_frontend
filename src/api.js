import axios from "axios";
import { act } from "react";

import qs from "qs";
//const BASE_URL = "http://localhost:8080/innovationLab/rest/";
const BASE_URL = "https://localhost:8443/innovationLab/rest/";
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
      console.log(error.response.data);
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
  changePassword: (token, data) =>
    apiClient
      .post(`/users/change-password`, data, { headers: { token: token } })
      .then(handleResponse)
      .catch(handleError),
  updatePassword: (token, data) =>
    apiClient
      .put("/users/update-password", data, { headers: { token: token } })
      .then(handleResponse)
      .catch(handleError),
  changeVisibility: (token, data) =>
    apiClient
      .put("/users/change-visiblity", data, { headers: { token: token } })
      .then(handleResponse)
      .catch(handleError),
  getUser: (token, props) =>
    apiClient
      .get("/users", {
        headers: { token },
        params: { email: props.email },
      })
      .then(handleResponse)
      .catch(handleError),
  updateUser: (token, data) => apiClient.put("/users", data, { headers: { token } }).then(handleResponse).catch(handleError),

  getUsers: (token, props) => {
    const queryString = qs.stringify(props, { arrayFormat: "repeat" });

    return apiClient
      .get(`/users/?${queryString}`, {
        headers: { token },
      })
      .then(handleResponse)
      .catch(handleError);
  },

  getUsersByDto: (token, props) =>
    apiClient
      .get("/users/", {
        headers: { token },
        params: {
          firstName: props.firstName,
          lastName: props.lastName,
          username: props.username,
          email: props.email,
          privateProfile: props.privateProfile,
          confirmed: props.confirmed,
          role: props.role,
          lab_id: props.lab_id,
          skill: props.skill,
          interest: props.interest,
          dtoType: props.dtoType,
        },
      })
      .then(handleResponse)
      .catch(handleError),

  getUsersForProject: (token, projectId) => apiClient.get(`/users/${projectId}`, { headers: { token } }).then(handleResponse).catch(handleError),

  getUsersForTask: (token, projectId) => apiClient.get(`/users/task/${projectId}`, { headers: { token } }).then(handleResponse).catch(handleError),

  //LOCATION endpoints
  getAllLocations: (token) => apiClient.get("/labs", { headers: { token } }).then(handleResponse).catch(handleError),

  //SKILL endpoints
  addSkill: (token, data) => apiClient.post("/skills", data, { headers: { token } }).then(handleResponse).catch(handleError),
  removeSkill: (token, data) => apiClient.put("/skills", data, { headers: { token } }).then(handleResponse).catch(handleError),
  getSkillType: (token) => apiClient.get("/skills/types", { headers: { token } }).then(handleResponse).catch(handleError),
  getAllSkills: (token) => apiClient.get("/skills", { headers: { token } }).then(handleResponse).catch(handleError),
  getUserSkills: (token, email) =>
    apiClient
      .get("/skills", {
        headers: { token },
        params: { userEmail: email },
      })
      .then(handleResponse)
      .catch(handleError),

  getSkillsForProject: (token, projectId) => apiClient.get(`/skills/${projectId}`, { headers: { token } }).then(handleResponse).catch(handleError),

  addSkillToProject: (token, projectId, skillId) =>
    apiClient.put(`/skills/${projectId}/${skillId}`, {}, { headers: { token } }).then(handleResponse).catch(handleError),

  addSkillToProjectDto: (token, projectId, skillId) =>
    apiClient.put(`/skills/create/${projectId}/`, skillId, { headers: { token } }).then(handleResponse).catch(handleError),

  removeSkillFromProject: (token, projectId, skillId) =>
    apiClient.put(`/skills/remove/${projectId}/${skillId}`, {}, { headers: { token } }).then(handleResponse).catch(handleError),

  //INTEREST endpoints
  addInterest: (token, data) => apiClient.post("/interests", data, { headers: { token } }).then(handleResponse).catch(handleError),
  removeInterest: (token, data) => apiClient.put("/interests", data, { headers: { token } }).then(handleResponse).catch(handleError),
  getAllInterests: (token) => apiClient.get("/interests", { headers: { token } }).then(handleResponse).catch(handleError),
  getUserInterests: (token, email) =>
    apiClient
      .get("/interests", {
        headers: { token },
        params: { userEmail: email },
      })
      .then(handleResponse)
      .catch(handleError),

  getInterestsFromProject: (token, projectId) => apiClient.get(`/interests/${projectId}`, { headers: { token } }).then(handleResponse).catch(handleError),

  addInterestToProject: (token, projectId, interestId) =>
    apiClient.put(`/interests/${projectId}/${interestId}`, {}, { headers: { token } }).then(handleResponse).catch(handleError),
  createInterestToProject: (token, projectId, interest) =>
    apiClient.post(`/interests/create/${projectId}`, interest, { headers: { token } }).then(handleResponse).catch(handleError),
  removeInterestFromProject: (token, projectId, interestId) =>
    apiClient.put(`/interests/remove/${projectId}/${interestId}`, {}, { headers: { token } }).then(handleResponse).catch(handleError),

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

  //PROJECT endpoint

  // props é um objecto com todos os possiveis parametros que podem ser passados ao método
  // apenas para simplificar a chamada e não ter que passar todos os parametros
  getProjectsByDto: (token, props) =>
    apiClient
      .get(`/projects/`, {
        headers: { token },
        params: {
          name: props.name,
          status: props.status,
          lab_id: props.lab_id,
          creator_email: props.creator_email,
          skill: props.skill,
          interest: props.interest,
          participant_email: props.participant_email,
          role: props.role,
          id: props.id,
          dtoType: props.dtoType,
        },
      })
      .then(handleResponse)
      .catch(handleError),

  // props é um objecto com todos os possiveis parametros que podem ser passados ao método
  // apenas para simplificar a chamada e não ter que passar todos os parametros
  // query string é um objecto com todos os possiveis parametros que podem ser passados ao método
  getProjects: (token, props) => {
    const queryString = qs.stringify(props, { arrayFormat: "repeat" });

    return apiClient
      .get(`/projects/?${queryString}`, {
        headers: { token },
      })
      .then(handleResponse)
      .catch(handleError);
  },
  getFilterOptions: (token) => apiClient.get("/projects/filter-options", { headers: { token } }).then(handleResponse).catch(handleError),

  createProject: (token, data) => apiClient.post("/projects", data, { headers: { token } }).then(handleResponse).catch(handleError),

  acceptInvite: (token, tokenAuthorization, accept) =>
    apiClient.post(`/projects/invite/${tokenAuthorization}/${accept}`, {}, { headers: { token } }).then(handleResponse).catch(handleError),

  getProjectsToInviteUser: (token, email) =>
    apiClient.get(`/projects/invite-projects?email=${email}`, { headers: { token } }).then(handleResponse).catch(handleError),

  getProjectMessages: (token, id, props) => {
    const queryString = qs.stringify(props, { arrayFormat: "repeat" });
    return apiClient.get(`/projects/${id}/msg?${queryString}`, { headers: { token } }).then(handleResponse).catch(handleError);
  },

  getProjectLogs: (token, id, props) => {
    const queryString = qs.stringify(props, { arrayFormat: "repeat" });
    return apiClient.get(`/projects/${id}/logs?${queryString}`, { headers: { token } }).then(handleResponse).catch(handleError);
  },

  getProjectUsers: (token, id) => {
    return apiClient.get(`/projects/${id}/users`, { headers: { token } }).then(handleResponse).catch(handleError);
  },

  updateUserRole: (token, userId, dto) => {
    return apiClient.put(`/projects/users/${userId}/role`, dto, { headers: { token } }).then(handleResponse).catch(handleError);
  },

  kickUser: (token, userId, projectId) => {
    return apiClient.put(`/projects/users/${userId}/${projectId}/kick`, {}, { headers: { token } }).then(handleResponse).catch(handleError);
  },

  getInvites: (token, projectId) => {
    return apiClient.get(`/projects/${projectId}/invites`, { headers: { token } }).then(handleResponse).catch(handleError);
  },

  acceptResume: (token, projectId, props) => {
    return apiClient.put(`/projects/${projectId}/invite-response/`, props, { headers: { token } }).then(handleResponse).catch(handleError);
  },

  sendProposed: (token, projectId) => {
    return apiClient.post(`/projects/${projectId}/proposed`, {}, { headers: { token } }).then(handleResponse).catch(handleError);
  },

  leaveProject: (token, projectId) => {
    return apiClient.put(`/projects/${projectId}/leave`, {}, { headers: { token } }).then(handleResponse).catch(handleError);
  },

  cancelProject: (token, projectId, justify) => {
    return apiClient.put(`/projects/${projectId}/cancel`, justify, { headers: { token } }).then(handleResponse).catch(handleError);
  },

  // submitProject: (token, projectId) => {
  //   return apiClient.put(`/projects/${projectId}/submit`, {}, { headers: { token } }).then(handleResponse).catch(handleError);
  // },

  updateStatus: (token, projectId, status) => {
    return apiClient.put(`/projects/${projectId}/status`, status, { headers: { token } }).then(handleResponse).catch(handleError);
  },

  //PRODUCTS endpoint
  getProducts: (token, props) => {
    const queryString = qs.stringify(props, { arrayFormat: "repeat" });

    return apiClient
      .get(`/products/?${queryString}`, {
        headers: { token },
      })
      .then(handleResponse)
      .catch(handleError);
  },

  getProductsForProject: (token, projectId) => apiClient.get(`/products/${projectId}`, { headers: { token } }).then(handleResponse).catch(handleError),

  editProjectProducts: (token, projectId, products) =>
    apiClient.put(`/products/productEdition/${projectId}`, products, { headers: { token } }).then(handleResponse).catch(handleError),

  getFilterOptionsProducts: (token) => apiClient.get("/products/filter-options", { headers: { token } }).then(handleResponse).catch(handleError),
  getBrands: (token) => apiClient.get("/products/brands", { headers: { token } }).then(handleResponse).catch(handleError),
  createProduct: (token, data) => apiClient.post("/products", data, { headers: { token } }).then(handleResponse).catch(handleError),

  //MAILS endpoint
  getMails: (token, props) => {
    const queryString = qs.stringify(props, { arrayFormat: "repeat" });

    return apiClient
      .get(`/emails/?${queryString}`, {
        headers: { token },
      })
      .then(handleResponse)
      .catch(handleError);
  },
  deleteMail: (token, id) => apiClient.post(`/emails/delete/${id}`, {}, { headers: { token } }).then(handleResponse).catch(handleError),

  markAsRead: (token, id) => apiClient.put(`/emails/${id}`, {}, { headers: { token } }).then(handleResponse).catch(handleError),

  sendResponse: (token, id, props) => apiClient.post(`/emails/${id}/response`, props, { headers: { token } }).then(handleResponse).catch(handleError),

  sendMail: (token, props) => apiClient.post("/emails/send", props, { headers: { token } }).then(handleResponse).catch(handleError),

  //SUPPLIER endpoints
  getSuppliers: (token, props) => {
    const queryString = qs.stringify(props, { arrayFormat: "repeat" });

    return apiClient
      .get(`/suppliers/?${queryString}`, {
        headers: { token },
      })
      .then(handleResponse)
      .catch(handleError);
  },
  updateProductSupplier: (token, props) => apiClient.put(`/products/${props.id}`, props, { headers: { token } }).then(handleResponse).catch(handleError),

  //extra project

  inviteUserToProject: (token, data) => apiClient.post("/projects/invite", data, { headers: { token } }).then(handleResponse).catch(handleError),

  //NOTIFICATION endpoints
  getNotifications: (token, props) => {
    const queryString = qs.stringify(props, { arrayFormat: "repeat" });

    return apiClient
      .get(`/notifications/?${queryString}`, {
        headers: { token },
      })
      .then(handleResponse)
      .catch(handleError);
  },

  markNotificationAsRead: (token, id) => apiClient.put(`/notifications/${id}`, {}, { headers: { token } }).then(handleResponse).catch(handleError),
  verifyToken: (token) => apiClient.post("/users/verify-token", { headers: { token } }).then(handleResponse).catch(handleError),

  //TASK endpoints
  getTasksByDto: (token, id, props) => {
    const queryString = qs.stringify(props, { arrayFormat: "repeat" });

    return apiClient
      .get(`/projects/${id}/tasks?${queryString}`, {
        headers: { token },
      })
      .then(handleResponse)
      .catch(handleError);
  },

  getTasks: (token, id, props) => {
    const queryString = qs.stringify(props, { arrayFormat: "repeat" });

    return apiClient
      .get(`/tasks/${id}/?${queryString}`, {
        headers: { token },
      })
      .then(handleResponse)
      .catch(handleError);
  },

  getTasksForProject: (token, projectId) =>
    apiClient.get(`/tasks/create-info/${projectId}`, { headers: { token } }).then(handleResponse).catch(handleError),

  createTask: (token, props) => apiClient.post(`/tasks/`, props, { headers: { token } }).then(handleResponse).catch(handleError),

  updateTask: (token, id, props) => apiClient.put(`/tasks/${id}`, props, { headers: { token } }).then(handleResponse).catch(handleError),

  updateTaskDate: (token, id, props) => apiClient.put(`/tasks/${id}/date`, props, { headers: { token } }).then(handleResponse).catch(handleError),

  deleteTask: (token, id) => apiClient.put(`/tasks/inactivate/${id}`, {}, { headers: { token } }).then(handleResponse).catch(handleError),

  createNote: (token, id, props) => apiClient.post(`/projects/${id}/notes`, props, { headers: { token } }).then(handleResponse).catch(handleError),

  //ADMIN endpoints

  getReadyProjects: (token) => apiClient.get("/admin/projects", { headers: { token } }).then(handleResponse).catch(handleError),

  acceptProject: (token, id, props) => apiClient.put(`/admin/projects/${id}/`, props, { headers: { token } }).then(handleResponse).catch(handleError),

  getReadyProject: (token, props) => {
    const queryString = qs.stringify(props, { arrayFormat: "repeat" });

    return apiClient
      .get(`/admin/projects/?${queryString}`, {
        headers: { token },
      })
      .then(handleResponse)
      .catch(handleError);
  },
  getStatisticsByLab: (token, lab) => {
    const queryString = qs.stringify(lab, { arrayFormat: "repeat" });
    return apiClient.get(`/admin/statistics?${queryString}`, { headers: { token } }).then(handleResponse).catch(handleError);
  },

  updateTimeout: (token, props) => apiClient.put(`/admin/timeout`, props, { headers: { token } }).then(handleResponse).catch(handleError),

  changeRole: (token, props) => apiClient.put(`/admin/role`, props, { headers: { token } }).then(handleResponse).catch(handleError),
};
