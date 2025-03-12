import { Request } from "express";

export interface RequestExtendsInterface extends Request {
  user?: { id: string };
  companyLogo?: string;
}
export interface PasswordRequestExtendsInterface extends Request {
  user?: { id: string };
  appName?: string;
  username?: string;
  email?: string;
  password?: string;
  webUrl?: string;
  passwordID?: number;
  categoryName?: string;
}

export interface SpecificIDRequest extends Request {
  user?: { id: string };
  body: { passwordID: number };
}

export interface UserDetailInterface {
  user?: { id: string };
  _id?:string,
  body:{
    username: string;
    fullname: string;
    password: string;
    nPassword: string;
  }
}
