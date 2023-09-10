import { Router } from "express";
import DecoratorRouter from "../decorators/router.decorators";
const IndexRoutes: Router = Router();
IndexRoutes.use(DecoratorRouter);
export default IndexRoutes;
