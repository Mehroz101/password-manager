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

export interface DeleteRequest extends Request {
  user?: { id: string };
  body: { passwordID: number };
}
