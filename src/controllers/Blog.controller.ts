import { Response, Request } from 'express';
import Blog, { IContent } from '../modals/Blog.modal';
import { UploadImage } from '../lib/CloudinaryConfig';
export const AddBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, paragraph, frontImage, content, category } = req.body;
    const { id } = req.query;
    const frontImageUpload = await UploadImage(frontImage);
    const contentWithImages = await Promise.all(
      content.map(async (contentItem: IContent) => {
        if (contentItem.image) {
          const imageUpload = await UploadImage(contentItem.image);
          return {
            ...contentItem,
            image: imageUpload.secure_url,
          };
        }
        return contentItem;
      })
    );
    const blogPost = new Blog({
      title,
      paragraph,
      frontImage: frontImageUpload.secure_url,
      writer: id,
      category: category,
      content: contentWithImages,
    });

    const savedBlogPost = await blogPost.save();
    res.status(201).json(savedBlogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const GetBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.find();
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const GetSingleBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const blog = await Blog.findById(id);
    await Blog.findByIdAndUpdate({ _id: id }, { visitors: blog.visitors + 1 });
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
