import * as Yup from 'yup'

export const CreateBlogValidator = Yup.object({
  title: Yup.string().required('title is required.'),
  paragraph: Yup.string().required('Paragraph is required'),
  frontImage: Yup.string().required('frontImage status is required.'),
  category: Yup.string().required('Category status is required.'),
  content: Yup.array().of(
    Yup.object({
      title: Yup.string().optional(),
      paragraph: Yup.string().required('Paragraph is required'),
      image: Yup.string().nullable()
    })
  )
})

export const GetBlogValidor = Yup.object({
  page: Yup.number()
})
export const GetSingleBlogValidator = Yup.object({
  id: Yup.string().required('Id is required')
})
