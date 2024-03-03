import axios from "axios";

axios.defaults.baseURL = 'https://oaa-app-2b3d894f937e.herokuapp.com/'
axios.defaults.headers.post['Content-type'] = 'multipart/form-data'
axios.defaults.withCredentials = true;
