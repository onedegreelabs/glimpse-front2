export interface FetchError extends Error {
  status: number;
  errorCode: string;
  message: string;
}
