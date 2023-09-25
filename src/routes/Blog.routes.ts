import express from 'express'
import { AddBlog, GetBlog } from '../controllers/Blog.controller'
import { GetSingleBlog, GetFeaturedPosts } from '../controllers/Blog.controller'

const router = express.Router()

router.post('/add-blog', AddBlog)
router.get('/get-blog', GetBlog)
router.get('/get-single-blog', GetSingleBlog)
router.get('/featured', GetFeaturedPosts)
export default router
