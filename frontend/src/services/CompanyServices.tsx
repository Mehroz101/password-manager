import axios from "axios";
import {
  CompanyRegistrationInterface,
  ResponseInterface,
} from "../types/Types";
const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
const API_URL = `${REACT_APP_API_URL}/company`;

export const RegisterCompany = async (
  data: CompanyRegistrationInterface
): Promise<ResponseInterface> => {
  try {
    const token = localStorage.getItem("passwordmanager");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URL + "/register", data, config);
    if (response.data) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
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
};
export const UploadCompanyLogo = async (
  data: any
): Promise<ResponseInterface> => {
  try {
    const token = localStorage.getItem("passwordmanager");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URL + "/uploadlogo", data, config);
    if (response.data) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
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
};
export const GetCompanyDetail = async (): Promise<ResponseInterface> => {
  try {
    const token = localStorage.getItem("passwordmanager");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + "/getcompanydetail", config);
    if (response.data) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
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
};

export const SendInvitation = async (data: {
  email: string;
  accessLevel: string;
}) => {
  try {
    const token = localStorage.getItem("passwordmanager");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      API_URL + `/sendinvitation`,
      data,
      config
    );
    return response.data.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as any).response?.data?.message,
    };
  }
};
export const AcceptInvitation = async (data: { token: string }) => {
  try {
    const token = localStorage.getItem("passwordmanager");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      API_URL + `/acceptinvitation`,
      data,
      config
    );
    return response.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as any).response?.data?.message,
    };
  }
};
export const CompanyUsersFetch = async (id: string) => {
  try {
    const token = localStorage.getItem("passwordmanager");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      API_URL + `/companyusersfetch/${id}`,
      config
    );
    console.log(response.data, "company users data");
    return response.data.users;
  } catch (error: unknown) {
    console.log(error, "error in company users fetch");
    return {
      success: false,
      message: (error as any).response?.data?.message,
    };
  }
};
