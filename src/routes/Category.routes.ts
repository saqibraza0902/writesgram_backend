import express from "express";
import { AddCategory } from "../controllers/Categories.controller";
import { GetCategories } from "../controllers/Categories.controller";
import { DelCategories } from "../controllers/Categories.controller";
const router = express.Router();

router.post("/add", AddCategory);
router.get("/get", GetCategories);
router.delete("/del/:id", DelCategories);

export default router;
