import { Response, Request } from 'express';
import BlogPost from '../modals/blog';
import { UploadImage } from '../lib/CloudinaryConfig';
export const AddBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, paragraph, frontImage, content } = req.body;
    const frontImageUpload = await UploadImage(frontImage);
    const contentWithImages = await Promise.all(
      content.map(async (contentItem) => {
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
    const blogPost = new BlogPost({
      title,
      paragraph,
      frontImage: frontImageUpload.secure_url,
      content: contentWithImages,
    });

    const savedBlogPost = await blogPost.save();
    res.status(201).json(savedBlogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new blog post' });
  }
};

export const GetBlog = async (req: Request, res: Response) => {
  try {
    const blog = await BlogPost.find();
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const GetSingleBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const blog = await BlogPost.findById(id);
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
