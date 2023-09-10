import { ObjectId } from "mongoose";

export interface IUser {
  fullName: string;
  username: string;
  password: string;
  accessToken?: string;
  email?: string;
  mobile?: string;
  avatar?: string;
}

export type findUser = (IUser & { _id: ObjectId }) | null;
