import { AxiosError } from "axios";

// Type guard with "type predicate"
export function isAxiosError(candidate: any): AxiosError {
  if (
    candidate &&
    typeof candidate === "object" &&
    "isAxiosError" in candidate
  ) {
    return candidate;
  }
  return candidate;
}
