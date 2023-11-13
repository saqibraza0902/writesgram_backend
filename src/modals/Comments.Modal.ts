import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface IComment {
  user: mongoose.Schema.Types.ObjectId;
  blog: mongoose.Schema.Types.ObjectId;
  comment: string;
}
const CommentsSchema = new Schema<IComment>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
      required: true,
    },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);
const Comments = mongoose.model<IComment>("comments", CommentsSchema);
export default Comments;
