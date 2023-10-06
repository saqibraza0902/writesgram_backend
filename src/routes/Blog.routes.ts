import express from 'express'
import { AddBlog, SetFeatured } from '../controllers/Blog.controller'
import { GetSingleBlog, GetFeaturedPosts } from '../controllers/Blog.controller'
import { GetPopularPost } from '../controllers/Blog.controller'
import { DashboardItems, GetBlog } from '../controllers/Blog.controller'
import { SubscribeCtrl } from '../controllers/Blog.controller'
const router = express.Router()

router.post('/add-blog', AddBlog)
router.get('/latest', GetBlog)
router.get('/get-single-blog', GetSingleBlog)
router.get('/featured', GetFeaturedPosts)
router.get('/popular', GetPopularPost)
router.post('/subscribe', SubscribeCtrl)

// Admin Routes
router.patch('/add/featured', SetFeatured)
router.get('/analytics', DashboardItems)
export default router
