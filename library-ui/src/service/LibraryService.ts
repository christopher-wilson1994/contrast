import axios from "axios";
import { library } from "../shared/interfaces/library.interface";

export const fetchLibraries = async () => {
  const res = await axios.get("/api/libraries");
  console.log(res.data);
  return res.data;
};

export const addLibrary = async (lib: library) => {
  const res = await axios.post("/api/library", lib);
  return res.data;
};

export const deleteLibraryById = async (id: number) => {
  const res = await axios.delete(`/api/library/${id}`);
  return res.data;
};

export const updateLibraryById = async (id: number, lib: library) => {
  const res = await axios.put(`/api/library/${id}`, lib);
  return res.data;
};
