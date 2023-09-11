import { validateSync } from "class-validator";
import { IBlog } from "../../types/blog.types";
import { BlogIdDto, CreateBlogDto } from "./blog.dto";
import { errorHandler } from "../../modules/utils";
import { BlogModel } from "../../models/blog/blog.model";
import { FindDoc } from "../../types/public.types";

export class BlogService {
  async create(blogDto: CreateBlogDto): Promise<IBlog> {
    const errors = validateSync(blogDto);
    const checkedErrors = errorHandler(errors);
    if (checkedErrors.length > 0)
      throw { status: 400, errors: checkedErrors, message: "اعتبار سنجی اشتباه می باشد" };
    const blog: IBlog = await BlogModel.create(blogDto);
    return blog;
  }
  async getAll(): Promise<IBlog[]> {
    const blogs: IBlog[] = await BlogModel.find({});
    return blogs;
  }
  async fetchByID(blogID: BlogIdDto): Promise<FindDoc<IBlog>> {
    const blog: FindDoc<IBlog> = await BlogModel.findById(blogID.id);
    if (!blog) throw { status: 404, message: "مقاله مورد نظر یافت نشد" };
    return blog;
  }
  async removeByID(blogID: BlogIdDto): Promise<string> {
    const blog: FindDoc<IBlog> = await this.fetchByID(blogID);
    console.log("blog : " , blog)
    if (!blog) throw { status: 404, message: "مقاله مورد نظر یافت نشد" };
    const deleteResult: any = await BlogModel.deleteOne({ _id: blogID.id });
    if (deleteResult.deletedCount > 0) return "مقاله مورد نظر با موفقیت حذف شد";
    return "مقاله مورد نظر حذف نشد";
  }
}
