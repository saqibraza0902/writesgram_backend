import mongoose from "mongoose";
export interface ICategory {
  name: string;
  icon: string;
}
const CategoryModel = new mongoose.Schema<ICategory>(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<ICategory>("category", CategoryModel);
export default Category;
