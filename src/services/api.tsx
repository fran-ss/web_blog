import axios from "axios";
export const api = axios.create({
  baseURL: "http://10.24.31.156:3333/",
});
