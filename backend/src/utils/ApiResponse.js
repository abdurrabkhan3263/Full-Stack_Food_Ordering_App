class ApiResponse {
  constructor(status, data, message, success) {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = success;
  }
}

export default ApiResponse;
