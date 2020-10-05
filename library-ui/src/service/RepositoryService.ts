import axios from "axios";

export const fetchRepositories = async () => {
  const res = await axios.get("/api/repositories");
  return res.data;
};
