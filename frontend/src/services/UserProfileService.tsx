import axios from "axios";
import { ResponseInterface, UserDetailInterface } from "../types/Types";

const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
const API_URL = `${REACT_APP_API_URL}/user`;
export const GetUserProfileData = async (): Promise<ResponseInterface> => {
  try {
    const token = localStorage.getItem("passwordmanager");
    const config = {
      headers: {
        Authorization: `Berar ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/userprofiledata`, config);
    return response.data;
  } catch (error: unknown) {

      return {
        success: false,
        message: (error as any).response.data?.message || "An error occurred",
      };
  }
};

export const UserDetail = async (data: UserDetailInterface) => {
  try {
    const token = localStorage.getItem("passwordmanager");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${API_URL}/updateuserdetail`,
      data,
      config
    );
    return response.data;
  } catch (error: unknown) {
  
      return {
        success: false,
        message: (error as any).response.data?.message || "An error occurred",
      };
  }
};
export const UserProfileDetail = async () => {
  try {
    const token = localStorage.getItem("passwordmanager");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/userprofiledetail`, config);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {

     
    }
      return {
        success: false,
        message: (error as any).response.data?.message || "An error occurred",
      };
  }
};

export const UpdateProfileImg = async (data: {
  profileImg: File;
}): Promise<ResponseInterface> => {
  try {
    const token = localStorage.getItem("passwordmanager");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const formData = new FormData();
    formData.append("profileImg", data.profileImg);
    const response = await axios.post(
      `${API_URL}/updateprofileimg`,
      formData,
      config
    );
    return response.data;
  } catch (error: unknown) {

      return {
        success: false,
        message: (error as any).response.data?.message || "An error occurred",
      };
}
}