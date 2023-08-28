import { Response, Request } from 'express';
import BlogPost from '../modals/blog';
import { UploadImage } from '../lib/CloudinaryConfig';

export const AddBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, frontImage, content } = req.body;
    const frontImageUpload = await UploadImage(frontImage);
    const blogPost = new BlogPost({
      title,
      frontImage: frontImageUpload.secure_url,
      content,
    });
    const savedBlogPost = await blogPost.save();
    res.status(201).json(savedBlogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new blog post' });
  }
};
