class ApiCall {
  base_url;
  constructor() {
    this.base_url = import.meta.env.VITE_BASE_URL;
  }
  async getCategory() {
    try {
      const response = await (await fetch(`${this.base_url}/category`)).json();
      return response;
    } catch (error) {
      throw error;
    }
  }
}

const Api = new ApiCall();

export default Api;
