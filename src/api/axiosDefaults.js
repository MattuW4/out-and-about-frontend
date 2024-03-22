import axios from "axios";

axios.defaults.baseURL = "https://oaa-app-2b3d894f937e.herokuapp.com/"
// axios.defaults.baseURL = "https://8000-mattuw4-outandaboutback-wemrfgif75z.ws-eu110.gitpod.io"
axios.defaults.headers.post["Content-Type"] = "multipart/form-data"
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
