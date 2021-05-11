import axios from "axios";
import { SERVER_URL } from "./constants";

export async function getUser() {
  return axios.get(`${SERVER_URL}/api/user`, {
    withCredentials: true,
  });
}

export async function login({ password, username }) {
  return axios({
    url: `${SERVER_URL}/auth/local/login`,
    method: "POST",
    withCredentials: true,
    data: { password, username },
  });
}

export async function signup({ password, username }) {
  return axios({
    url: `${SERVER_URL}/auth/local/signup`,
    method: "POST",
    withCredentials: true,
    data: { password, username },
  });
}

export async function getAllPosts() {
  return axios({
    url: `${SERVER_URL}/api/posts`,
    method: "GET",
    withCredentials: true,
  });
}

export async function createPost({ content }) {
  return axios({
    url: `${SERVER_URL}/api/posts`,
    method: "POST",
    withCredentials: true,
    data: { content },
  });
}
