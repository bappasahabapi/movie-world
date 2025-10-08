export class ApiError extends Error {
  status: number;
  details?: any;
  constructor(status: number, message: string, details?: any) {
    super(message);
    this.status = status;
    this.details = details;
  }
}
export const NotFound = (m = "Not Found") => new ApiError(404, m);
export const BadRequest = (m = "Bad Request", details?: any) =>
  new ApiError(400, m, details);
