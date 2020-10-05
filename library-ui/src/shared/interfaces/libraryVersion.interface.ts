import { VulnerabilityType } from "./vulnerabilityType.interface";

export interface libraryVersion {
  id?: number;
  name?: string;
  vulnerabilities?: VulnerabilityType[];
}
