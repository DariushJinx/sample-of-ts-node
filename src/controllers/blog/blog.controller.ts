import { NextFunction, Request, Response } from "express";
import { Controller, Delete, Get, Post } from "../../decorators/router.decorators";
import { BlogIdDto, CreateBlogDto } from "./blog.dto";
import { plainToClass } from "class-transformer";
import { BlogService } from "./blog.service";
import { IBlog } from "../../types/blog.types";
import { FindDoc } from "../../types/public.types";
const blogService: BlogService = new BlogService();
@Controller("/blog")
export class BlogController {
  @Post()
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const blogDto: CreateBlogDto = plainToClass(CreateBlogDto, req.body, {
        excludeExtraneousValues: true,
      });
      const blog: IBlog = await blogService.create(blogDto);
      return res.status(201).json({
        statusCode: 201,
        message: "مقاله مورد نظر ایجاد شد",
        data: { blog },
      });
    } catch (err) {
      next(err);
    }
  }
  @Get()
  async allBlogs(req: Request, res: Response, next: NextFunction) {
    try {
      const blogs: IBlog[] = await blogService.getAll();
      return res.status(200).json({
        statusCode: 200,
        message: "تمامی مقاله های موجود بازگردانی شدند",
        data: { blogs },
      });
    } catch (err) {
      next(err);
    }
  }
  @Get("/find/:id")
  async findOneBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const blogDto: BlogIdDto = plainToClass(BlogIdDto, req.params);
      const blog: FindDoc<IBlog> = await blogService.fetchByID(blogDto);
      return res.status(200).json({
        statusCode: 200,
        message: "مقاله مورد نظر با موفقیت بازگردانی شد",
        data: {
          blog,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  @Delete("/remove/:id")
  async removeBlog(req: Request, res: Response, next: NextFunction) {
    const blogDto: BlogIdDto = plainToClass(BlogIdDto, req.params);
    const message: string = await blogService.removeByID(blogDto);
    return res.status(200).json({
      statusCode: 200,
      message,
    });
  }
}
