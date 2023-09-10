import { ObjectId } from "mongoose";
import { IUser } from "./user.types";

export type ResponseMethod = {
  statusCode: number;
  message?: string | undefined;
  data?: object | undefined;
};
export interface jwtGeneratorPayloadDTO {
  id: ObjectId,
  username: IUser['username']
}