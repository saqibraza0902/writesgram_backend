import express from 'express';
import { AddBlog } from '../controllers/Blog.controller';

const router = express.Router();

router.post('/add-blog', AddBlog);

export default router;
