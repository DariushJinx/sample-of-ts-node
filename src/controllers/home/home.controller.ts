import { NextFunction, Request, Response } from "express";
import { Controller, Get } from "../../decorators/router.decorators";

@Controller("/users")
export class HomeApplication {
  @Get()
  home(req: Request, res: Response, next: NextFunction) {
    try {
      return res.send("users");
    } catch (err) {
      next(err);
    }
  }
}
