import { AuthInterface, ResponseInterface } from "../types/Types";
import axios from "axios";
const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
const API_URL = `${REACT_APP_API_URL}/api`;
export const LoginFunc = async (
  data: AuthInterface
): Promise<ResponseInterface> => {
  try {
    console.log(data, "data");
    const response = await axios.post(API_URL + "/login", data);
    console.log(response);
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    } else {
      return {
        success: true,
        data: response.data,
        message: response.data.message,
      };
    }
  } catch (error: unknown) {
    debugger;
    console.log(error);
    return {
      success: false,
      message: (error as any).response?.data?.message || "An error occurred",
    };
  }
};

export const SignupFunc = async (
  data: AuthInterface
): Promise<ResponseInterface> => {
  try {
    console.log(data, "data");
    const response = await axios.post(API_URL + "/signup", data);
    console.log(response);
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    } else {
      return {
        success: true,
        data: response.data,
        message: response.data.message,
      };
    }
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as any).response?.data?.message || "An error occurred",
    };
  }
};
