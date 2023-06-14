import { Request } from 'express';

export interface IDappOwnerRegisterReqBody {
  publicKey: string;
  signature: string;
  email: string;
  dappName: string;
}

export type IDappOwnerRegisterReq = Request<any, any, IDappOwnerRegisterReqBody>;

export interface IDappOwnerIsApprovedReqBody extends Pick<IDappOwnerRegisterReqBody, 'publicKey' | 'signature'> {}

export type IDappOwnerIsApprovedReq = Request<any, any, IDappOwnerIsApprovedReqBody>;

export interface IDappOwnerApproveReqBody {
  id: string;
  publicKey: string;
  signature: string;
}

export type IDappOwnerApproveReq = Request<any, any, IDappOwnerApproveReqBody>;

export interface ITokensRequestReqBody {
  users: Array<string>;
  publicKey: string;
  signature: string;
}

export type ITokensRequestReq = Request<any, any, ITokensRequestReqBody>;
