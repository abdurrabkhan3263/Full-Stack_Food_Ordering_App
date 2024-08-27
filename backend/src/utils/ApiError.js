class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status || 500;
    this.message = message || "Server internal error";
  }
}

export { ApiError };
