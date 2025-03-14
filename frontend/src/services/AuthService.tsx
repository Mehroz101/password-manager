import { AuthInterface, ResponseInterface } from "../types/Types";
import axios from "axios";
const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
const API_URL = `${REACT_APP_API_URL}/auth`;
export const LoginFunc = async (
  data: AuthInterface
): Promise<ResponseInterface> => {
  try {
    const response = await axios.post(API_URL + "/login", data);
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

export const SignupFunc = async (
  data: AuthInterface
): Promise<ResponseInterface> => {
  try {
    const response = await axios.post(API_URL + "/signup", data);
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
