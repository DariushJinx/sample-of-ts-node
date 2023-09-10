import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { jwtGeneratorPayloadDTO } from "../types/public.types";
import { UserModel } from "../models/user/user.model";
import { Algorithm, sign } from "jsonwebtoken";
const AccessTokenSecretKey = "679D14321FDD3EACF886CE7DEE9FCCBE349397B3";

export function hashString(data: string): string {
  const salt: string = genSaltSync(10);
  const hashedString: string = hashSync(data, salt);
  return hashedString;
}
export function compareHashString(data: string, encrypted: string): boolean {
  return compareSync(data, encrypted);
}

export async function jwtGenerator(payload: jwtGeneratorPayloadDTO): Promise<void> {
  const { id } = payload;
  const user = await UserModel.findById(id);
  if (!user) throw { status: 404, message: "notFoundUser" };
  const expiresIn = new Date().getTime() + 1000 * 60 * 60 * 24;
  const algorithm: Algorithm = "HS512";
  sign(payload, AccessTokenSecretKey, { expiresIn, algorithm }, async (error, token) => {
    if (!error && token) {
      user.accessToken = token;
      await user.save();
    }
  });
}
