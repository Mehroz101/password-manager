import axios from "axios";
import { AddNewPassword } from "../types/Types";
const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
const API_URL = `${REACT_APP_API_URL}/password`;
export const AddAndUpdatePasswordFunc = async (data: AddNewPassword) => {
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
  } catch (error) {
    console.log(error);
  }
};

export const DeletePassword = async (passwordId: number) => {
  try {
    console.log("axios ", passwordId);
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
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    return response.data.data;
  } catch (error) {}
};
