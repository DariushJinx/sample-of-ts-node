import { NextFunction, Request, Response } from "express";
import { Controller, Post } from "../../decorators/router.decorators";
import { UserModel } from "../../models/user/user.model";
import { compareHashString, hashString, jwtGenerator } from "../../modules/utils";
import { IUser } from "../../types/user.types";
import { RegisterDTO } from "./auth.dto";
import { plainToClass } from "class-transformer";
import { AuthService } from "./auth.service";
const authService: AuthService = new AuthService();
@Controller("/auth")
export class AuthController {
  @Post()
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const registerDto: RegisterDTO = plainToClass(RegisterDTO, req.body, {
        excludeExtraneousValues: true,
      });
      const user: IUser = await authService.register(registerDto);
      return res.send(user);
    } catch (err) {
      next(err);
    }
  }
  @Post()
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const checkExistUser: IUser | null = await UserModel.findOne({ username });
      if (!checkExistUser) throw { status: 401, message: "کاربر و یا پسوورد صحیح نمی باشد" };
      const isUser: boolean = compareHashString(password, checkExistUser.password);
      if (!isUser) throw { status: 401, message: "کاربر و یا پسوورد صحیح نمی باشد" };

      await jwtGenerator({ username, id: checkExistUser._id });
      const user = await UserModel.findById(checkExistUser._id, { __v: 0, password: 0 });
      return res.json({
        statusCode: 200,
        data: {
          user,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
