import axios from "axios";

const baseURL = "http://localhost:3177/";

export default axios.create({ baseURL: baseURL });
