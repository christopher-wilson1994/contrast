import { libraryVersion } from "./libraryVersion.interface";
import { repository } from "./repository.interface";

export interface library {
  id?: number;
  name?: string;
  author?: string;
  downloads?: number;
  repository?: repository;
  versions?: libraryVersion[];
}
