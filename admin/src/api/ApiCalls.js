/* eslint-disable no-useless-catch */
class ApiCall {
  base_url;
  constructor() {
    this.base_url = import.meta.env.VITE_BASE_URL;
  }

  // CATEGORY API CALLS
  async getCategory() {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${this.base_url}/category`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async createCategory(inputData) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/category/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: inputData,
          }),
        },
      );
      const result = await response.json();
      if (!response.ok) {
        throw result?.message;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  async updateCategory(catId, category) {
    try {
      const response = await fetch(`${this.base_url}/category/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ catId, category }),
      });
      const result = await response.json();
      if (!response.ok || !response) {
        throw result?.message || "Something went wrong";
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  async deleteCategory(catId) {
    try {
      const response = await fetch(
        `${this.base_url}/category/delete/${catId}`,
        {
          method: "DELETE",
        },
      );
      const result = await response.json();
      if (!response.ok) {
        throw result?.message;
      }
      return result.message;
    } catch (error) {
      throw error;
    }
  }
  // FOOD API CALLS
  async addFood(data) {
    // eslint-disable-next-line no-useless-catch
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "image" && data[key][0] instanceof File) {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      });
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/food/add`,
        { method: "POST", body: formData },
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getFood() {
    try {
      const response = await fetch(`${this.base_url}/food?page=1&limit=20`, {
        method: "GET",
      });
      const result = await response.json();
      if (!response.ok) {
        throw result?.message;
      }
      return result?.data;
    } catch (error) {
      throw error;
    }
  }
}

const Api = new ApiCall();

export default Api;
