import { NextFunction, Request, Response } from "express";
import { Controller, Post } from "../../decorators/router.decorators";
import { UserModel } from "../../models/user/user.model";
import { compareHashString, hashString, jwtGenerator } from "../../modules/utils";
import { findUser } from "../../types/user.types";
@Controller("/auth")
export class AuthController {
  @Post()
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, fullName, password } = req.body;
      const newPassword = hashString(password);
      const checkExistUser = await UserModel.findOne({ username });
      if (checkExistUser) throw { status: 400, message: "این کاربر از قبل موجود می باشد" };
      const user = await UserModel.create({
        username,
        password: newPassword,
        fullName,
      });
      return res.send(user);
    } catch (err) {
      next(err);
    }
  }
  @Post()
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const checkExistUser: findUser = await UserModel.findOne({ username });
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
