import { Request, Response } from "express";
import Category from "../modals/Categories";
import { UploadImage } from "../lib/CloudinaryConfig";

export const AddCategory = async (req: Request, res: Response) => {
  try {
    const { name, icon } = req.body;
    const existingCat = await Category.findOne({ name: name });
    if (existingCat) {
      return res.status(400).json({
        message: "Catgory already exist",
      });
    }
    const uploadedicon = await UploadImage(icon);
    const cat = new Category({
      name: name,
      icon: uploadedicon.secure_url,
    });
    if (cat) {
      await cat.save();
      return res.status(201).json({ message: "Category Added Successfully" });
    }
    return res.status(400).json({ message: "Error Adding Category" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const GetCategories = async (req: Request, res: Response) => {
  try {
    const cats = await Category.find();
    if (cats) {
      return res.status(201).json(cats);
    }
    return res.status(400).json({ message: "Error processing this request" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const DelCategories = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Category.findOneAndDelete({ _id: id });
    return res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
