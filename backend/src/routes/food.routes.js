import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  addFood,
  deleteFood,
  getFood,
  getFoodById,
  updateFood,
} from "../controller/food.controller.js";

const router = Router();

router.route("/add").post(upload.single("image"), addFood);
router.route("/update/:foodId").patch(upload.single("image"), updateFood);
router.route("/delete/:foodId").delete(deleteFood);
router.route("").get(getFood);
router.route("/:id").get(getFoodById);

export default router;
