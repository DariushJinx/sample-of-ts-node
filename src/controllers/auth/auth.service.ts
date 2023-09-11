import { validateSync } from "class-validator";
import { IUser } from "../../types/user.types";
import { RegisterDTO } from "./auth.dto";
import { errorHandler, hashString } from "../../modules/utils";
import { UserModel } from "../../models/user/user.model";

export class AuthService {
  async register(userDto: RegisterDTO): Promise<IUser> {
    const errors = validateSync(userDto);
    const checkedErrors = errorHandler(errors);
    if (checkedErrors.length > 0)
      throw { status: 400, errors: checkedErrors, message: "اعتبار سنجی اشتباه می باشد" };
    const checkExistUser = await UserModel.findOne({ username: userDto.username });
    if (checkExistUser) throw { status: 400, message: "این کاربر از قبل موجود می باشد" };
    const newPassword = hashString(userDto.password);
    userDto.password = newPassword;
    const user: IUser = await UserModel.create(userDto);
    return user;
  }
}
