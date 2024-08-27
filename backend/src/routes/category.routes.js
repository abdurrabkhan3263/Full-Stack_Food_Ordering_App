import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  deleteMany,
  readCategory,
  updateCategory,
} from "../controller/food.controller.js";

const router = Router();

router.route("/create").post(createCategory);
router.route("/update").patch(updateCategory);
router.route("/delete/:catId").delete(deleteCategory);
router.route("/delete-many").delete(deleteMany);
router.route("").get(readCategory);

export default router;
