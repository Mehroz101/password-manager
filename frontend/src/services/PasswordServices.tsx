import axios from "axios";
import { AddNewPassword } from "../types/Types";
const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
const API_URL = `${REACT_APP_API_URL}/password`;
export const AddAndUpdatePasswordFunc = async (data: any) => {
  try {
    const token = localStorage.getItem("passwordmanager");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${API_URL}/addandupdatepassword`,
      data,
      config
    );
    return response.data;
  } catch (error:unknown) {
    // if((error as any).response.status== 401){
    //   localStorage.removeItem("passwordmanager")
    //   window.location.reload()
    // }
    return {
      success: false,
      message: (error as any).response?.data?.message,
    };  }
};

export const DeletePassword = async (passwordId: number) => {
  try {
    const token = localStorage.getItem("passwordmanager");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${API_URL}/deletepassword`,
      { passwordID: passwordId },
      config
    );
    return response.data;
  } catch (error:unknown) {
    // if((error as any).response.status== 401){
    //   localStorage.removeItem("passwordmanager")
    //   window.location.reload()
    // }
    return {
      success: false,
      message: (error as any).response?.data?.message,
    };
  }
};

export const GetAllPassword = async () => {
  try {
    const token = localStorage.getItem("passwordmanager");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/getallpasswords`, config);
    return response.data.data;
  } catch (error) {
    // if((error as any).response.status== 401){
    //   localStorage.removeItem("passwordmanager")
    //   window.location.reload()
    // }
    return {
      success: false,
      message: (error as any).response?.data?.message,
    };
  }
};
export const GetSpecificPassword = async (passwordID: number) => {
  try {
    const token = localStorage.getItem("passwordmanager");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${API_URL}/getspecificpassword`,
      { passwordID: passwordID },
      config
    );
    console.log(response.data.data)
    return response.data.data;
  } catch (error:unknown) {
    // if((error as any).response.status== 401){
    //   localStorage.removeItem("passwordmanager")
    //   window.location.reload()
    // }
    return {
      success: false,
      message: (error as any).response?.data?.message,
    };
  }
};

export const GetAllRecentActivites = async () =>{
  try {
    const token = localStorage.getItem("passwordmanager");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${API_URL}/getrecentactivities`,
      config
    );
    return response.data.data;
  } catch (error: unknown) {
    // if((error as any).response.status== 401){
    //   localStorage.removeItem("passwordmanager")
    //   window.location.reload()
    // }
    return {
      success: false,
      message: (error as any).response?.data?.message,
    };
    
  }
}