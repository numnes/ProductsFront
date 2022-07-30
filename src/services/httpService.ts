import axios from "axios";

export type HttpResponse<T> = {
  data?: T;
  status: number | undefined;
};

export class HttpService {
  baseUrl: string | undefined;
  haeders = {
    "Content-Type": "application/json",
    Authorization: "",
  };
  constructor(token?: string) {
    this.baseUrl = process.env.REACT_APP_API_URL;
    if (token) {
      this.haeders.Authorization = `Bearer ${token}`;
    }
  }

  async get<T>(url: string): Promise<HttpResponse<T> | string> {
    try {
      const { data, status } = await axios.get<T>(this.baseUrl + url, {
        headers: this.haeders,
      });
      return { data, status };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("error message: ", error.message);
        return error.message;
      } else {
        console.error("unexpected error: ", error);
        throw new Error("An unexpected error occurred");
      }
    }
  }

  async post<T>(
    url: string,
    requestData: any
  ): Promise<HttpResponse<T> | string> {
    try {
      const { data, status } = await axios.post<T>(
        this.baseUrl + url,
        requestData,
        {
          headers: this.haeders,
        }
      );
      return { data, status };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("error message: ", error.message);
        return { status: error.response?.status };
      } else {
        console.error("unexpected error: ", error);
        throw new Error("An unexpected error occurred");
      }
    }
  }

  async patch<T>(
    url: string,
    requestData: any
  ): Promise<HttpResponse<T> | string> {
    try {
      const { data, status } = await axios.patch<T>(
        this.baseUrl + url,
        requestData,
        {
          headers: this.haeders,
        }
      );
      return { data, status };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("error message: ", error.message);
        return { status: error.response?.status };
      } else {
        console.error("unexpected error: ", error);
        throw new Error("An unexpected error occurred");
      }
    }
  }

  async delete<T>(url: string): Promise<HttpResponse<T> | string> {
    try {
      const { data, status } = await axios.delete<T>(this.baseUrl + url, {
        headers: this.haeders,
      });
      return { data, status };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("error message: ", error.message);
        return { status: error.response?.status };
      } else {
        console.error("unexpected error: ", error);
        throw new Error("An unexpected error occurred");
      }
    }
  }
}
