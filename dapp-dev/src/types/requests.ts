import { Request } from 'express';

export interface IUserRegisterBody {
  publicKey: string;
  privateKey: string;
  nickname: string;
  password: string;
}

export type IUserRegisterReq = Request<any, any, IUserRegisterBody>;

export interface IUserGetKeysBody extends Pick<IUserRegisterBody, 'nickname' | 'password'> {}

export type IUserGetKeysReq = Request<any, any, IUserGetKeysBody>;

export interface ITokenReqBody {
  password: string;
}

export type ITokenReq = Request<any, any, ITokenReqBody>;
