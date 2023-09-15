import mongoose from 'mongoose';

export interface IContent {
  title: string;
  image: string;
  paragraph: string;
}
interface IBlog {
  title: string;
  frontImage: string;
  paragraph: string;
  writer: mongoose.Schema.Types.ObjectId;
  category: string;
  visitors: number;
  content: IContent[];
}
const blogPostSchema = new mongoose.Schema<IBlog>({
  title: { type: String, required: true },
  frontImage: { type: String, required: true },
  paragraph: { type: String, required: true },
  writer: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  visitors: { type: Number, default: 0 },
  category: { type: String, required: true },
  content: [
    {
      title: String,
      paragraph: { type: String, required: true },
      image: String,
    },
  ],
});

const BlogPost = mongoose.model<IBlog>('BlogPost', blogPostSchema);

export default BlogPost;
