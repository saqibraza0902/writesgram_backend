import { Response, Request } from 'express'
import Blog, { IContent } from '../modals/Blog.modal'
import { UploadImage } from '../lib/CloudinaryConfig'
import { CreateBlogValidator } from '../validators/Blog.validators'
import { GetBlogValidor } from '../validators/Blog.validators'
import { GetSingleBlogValidator } from '../validators/Blog.validators'
import { countWords } from '../utils/WordCount'
import User from '../modals/User.modal'
export const AddBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, paragraph, frontImage, content, category } =
      await CreateBlogValidator.validate(req.body)
    const { id } = req.query
    const frontImageUpload = await UploadImage(frontImage)
    const contentWithImages = await Promise.all(
      content.map(async (contentItem: IContent) => {
        if (contentItem.image) {
          const imageUpload = await UploadImage(contentItem.image)
          return {
            ...contentItem,
            image: imageUpload.secure_url
          }
        }
        return contentItem
      })
    )
    const arraycount = content
      .filter(blogs => blogs.title !== null)
      .map(b => {
        return countWords(b.title)
      })
    const totalWordCount = arraycount.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)
    const wordCount =
      countWords(title) +
      countWords(category) +
      countWords(paragraph) +
      totalWordCount
    const mins = Math.ceil(wordCount / 200)
    const blogPost = new Blog({
      title,
      paragraph,
      frontImage: frontImageUpload.secure_url,
      writer: id,
      category: category,
      time: mins,
      content: contentWithImages
    })
    const savedBlogPost = await blogPost.save()
    res.status(201).json(savedBlogPost)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error })
  }
}
export const GetBlog = async (req: Request, res: Response) => {
  try {
    const { page = 1 } = await GetBlogValidor.validate(req.query)
    const limit = 6
    const skip = (page - 1) * limit
    const blog = await Blog.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate('writer', '-password')
    const totalblogs = await Blog.count()
    const totalpages = Math.ceil(totalblogs / limit)
    return res.status(200).json({ blog, totalpages })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
export const GetSingleBlog = async (req: Request, res: Response) => {
  try {
    const { id } = await GetSingleBlogValidator.validate(req.query)
    const blog = await Blog.findById(id)
    await Blog.findByIdAndUpdate({ _id: id }, { visitors: blog.visitors + 1 })

    return res.status(200).json(blog)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
export const GetFeaturedPosts = async (req: Request, res: Response) => {
  try {
    const getposts = await Blog.find({ featured: true })
      .limit(2)
      .sort({ _id: -1 })
      .populate('writer', '-password')

    return res.status(200).json(getposts)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
export const GetPopularPost = async (req: Request, res: Response) => {
  try {
    const posts = await Blog.find()
      .sort({ visitors: -1 })
      .limit(4)
      .populate('writer', '-password')
    return res.status(200).json(posts)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
export const SetFeatured = async (req: Request, res: Response) => {
  try {
    const { id } = req.query
    const { page = 1 } = await GetBlogValidor.validate(req.query)
    const limit = 6
    const skip = (page - 1) * limit
    const update = await Blog.findByIdAndUpdate({ _id: id }, { featured: true })
    if (update) {
      const blog = await Blog.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .populate('writer', '-password')
      const totalblogs = await Blog.count()
      const totalpages = Math.ceil(totalblogs / limit)
      res
        .status(200)
        .json({ message: 'Blog set as featured', totalpages, blog })
    } else {
      res.status(400).json({ message: 'Error proceding this request' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}
export const DashboardItems = async (req: Request, res: Response) => {
  try {
    const admins = await User.count({ admin: true })
    const users = await User.count()
    const featured = await Blog.count({ featured: true })
    const blogs = await Blog.count()
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const count = await Blog.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      { $group: { _id: null, totalVisitors: { $sum: '$visitors' } } }
    ]).exec()
    const totalVisitors = count[0] ? count[0].totalVisitors : 0
    const analytics = {
      admins,
      users,
      featured,
      blogs,
      totalVisitors
    }
    return res.status(200).json(analytics)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
