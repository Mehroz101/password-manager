import { FieldError } from "react-hook-form";

export interface Category {
  icon: unknown;
  title: string;
  cardNo: number;
}

export interface RecentActivity {
  img: string;
  title: string;
  account: string;
  activityType: string;
  time: string;
  date: string;
}
export interface CInputType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  disabled?: boolean;
  error?: FieldError;
}

export interface CButtonType {
  label?: string;
  action?: () => void;
}

export interface AddNewPassword {
  appName: string;
  categoryType: string;
  categoryName: string;
  // name?: string;
  username?: string;
  email?: string;
  password: string;
  url?: string;
  passwordID?: number;
  apiKey?: string // add this line
  cardNumber?: string // add this line
  cvv?: string // add this line
  accountHolderName?: string // add this line
  socialUsername?: string // add this line
  socialPassword?: string // add this line

}
export interface AuthInterface {
  username: string;
  email: string;
  password: string;
  cPassword?: string;
}
export interface ResponseInterface {
  success: boolean;
  message: string;
  data?: any;
}

export interface CompanyRegistrationInterface {
  companyName: string;
  noOfUsers: number;
}
export interface DeletePasswordPayload {
  passwordID: number;
}
export interface GetAllPasswordResponse {
  passwordID: number;
  appName: string;
  categoryName: string;
  categoryType: string;
  email: string;
  password: string;
  username: string;
  webUrl: string;
  passwordImg: string;
}
export interface ActivityResponseInterface {
  passwordID: {
    passwordImg: string;
    appName: string;
    email: string;
  };
  createdAt: string;
  actionType: string;
}
export interface UserProfileInterface {
  username: string;
  name: string;
  profileImage: string;
}
export interface UserDetailInterface {
  username: "";
  fullname: "";
  password: "";
  nPassword: "";
}
