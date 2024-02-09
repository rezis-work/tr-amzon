import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-254f2.cloudfunctions.net/api",
});

export default instance;
