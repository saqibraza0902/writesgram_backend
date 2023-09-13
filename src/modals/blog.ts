const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  frontImage: { type: String, required: true },
  paragraph: { type: String, required: true },
  content: [
    {
      title: String,
      paragraph: { type: String, required: true },
      image: String,
    },
  ],
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
