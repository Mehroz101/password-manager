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
  categoryName: string;
  // name?: string;
  username?: string;
  email?: string;
  password: string;
  url?: string;
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
