import { Request } from "express";

export interface RequestExtendsInterface extends Request{
    user?:{id:string}    
}