import axios from "axios";

const BASEURL = process.env.REACT_APP_BASEURL;

const apiConfig = axios.create({
  baseURL: BASEURL,
})

export default apiConfig;