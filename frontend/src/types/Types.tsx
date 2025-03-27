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

export interface UpdatePassword {
  appName: string;
  categoryType: string;

  fields: {
    // Email Category
    recovery?: string;

    // Bank Category
    accountNumber?: string;
    bankName?: string;
    routingNumber?: string;

    // Card Category
    cardHolderName?: string;
    cardNumber?: string;
    expirationDate?: string;
    cvv?: string;
    pin?: string;

    // Social Category
    socialUsername?: string;
    socialPassword?: string;
    socialEmail?: string;
    socialPhone?: string;

    // API Category
    apiKey?: string;
    apiSecret?: string;
    endpoint?: string;

    // Wi‑Fi Category
    wifiName?: string;
    wifiPassword?: string;

    // Work Category
    workEmail?: string;
    employeeId?: string;
    workPassword?: string;
    loginUrl?: string;

    // Other Category
    otherDetails?: string;
  };
}
export interface AddNewPassword {
  // General Information
  appName?: string;
  categoryType: string;
  // Email Category
  email?:string;
  password?:string;
  recovery?: string;

  // Bank Category
  accountNumber?: string;
  bankName?: string;
  routingNumber?: string;
  // Card Category
  cardHolderName?: string;
  cardNumber?: string;
  expirationDate?: string;
  cvv?: string;
  pin?: string;

  // Social Category
  socialUsername?: string;
  socialPassword?: string;
  socialEmail?: string;
  socialPhone?: string;

  // API Category
  apiKey?: string;
  apiSecret?: string;
  endpoint?: string;

  // Wi‑Fi Category
  wifiName?: string;
  wifiPassword?: string;

  // Work Category
  workEmail?: string;
  employeeId?: string;
  workPassword?: string;
  loginUrl?: string;

  // Other Category
  otherDetails?: string;
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
  type:string,
  fields: {
    appName: string;
    type: string;
    email: string;
    password: string;
    username: string;
    webUrl: string;
    passwordImg: string;
  };
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
