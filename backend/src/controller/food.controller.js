import { isValidObjectId } from "mongoose";
import { Foods as Food } from "../models/food.models.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import fs from "fs";
import { error } from "console";

// Add Food items

const addFood = async (req, res, next) => {
  try {
    const image = req.file?.filename || "";
    const { name = "", price = "", category = "", description = "" } = req.body;
    if (
      !(
        name.trim() &&
        price.trim() &&
        category.trim() &&
        description.trim() &&
        image.trim()
      )
    ) {
      image.trim() && (await fs.unlinkSync(req.file?.path));
      throw new ApiError(
        400,
        "All fields name , price , category , images & descriptions are required"
      );
    }
    const food = await Food.create({
      name,
      price,
      category,
      description,
      image,
    });
    if (!food)
      throw new ApiError(500, "Cannot add the food due to server error");
    return res
      .status(201)
      .json(new ApiResponse(201, food, "Food is created successfully"));
  } catch (error) {
    next(error);
  }
};
const updateFood = async (req, res, next) => {
  try {
    const { foodId } = req.params;
    if (!isValidObjectId(foodId)) throw new ApiError(400, "Invalid Food id");

    const food = await Food.findById(foodId);
    if (!food) {
      image.trim() && (await fs.unlinkSync(req.file?.path));
      throw new ApiError(404, "Food is not found");
    }

    const image = req.file?.filename || "";
    const { name = "", price = "", category = "", description = "" } = req.body;
    if (
      !(
        name.trim() ||
        price.trim() ||
        category.trim() ||
        description.trim() ||
        image
      )
    ) {
      image.trim() && (await fs.unlinkSync(req.file?.path));
      throw new ApiError(
        400,
        "Atleast one field name , price , category , images & descriptions is required"
      );
    }

    let updateFood = {};
    if (name.trim()) updateFood.name = name;
    if (price.trim()) updateFood.price = price;
    if (category.trim()) updateFood.category = category;
    if (description.trim()) updateFood.description = description;
    if (image) {
      updateFood.image = image;
      food?.image && (await fs.unlinkSync(`public/temp/${food?.image}`));
    }

    const data = await Food.findByIdAndUpdate(foodId, updateFood, {
      new: true,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, data, "Food is updated successfully"));
  } catch (error) {
    next(error);
  }
};
const deleteFood = async (req, res, next) => {
  try {
    const { foodId } = req.params;
    if (!isValidObjectId(foodId)) throw new ApiError(400, "Invalid food id");

    const deleteFood = await Food.findByIdAndDelete(foodId);
    if (!deleteFood) throw new ApiError(404, "Food is not found");
    deleteFood?.image &&
      (await fs.unlinkSync(`public/temp/${deleteFood?.image}`));

    return res
      .status(200)
      .json(new ApiResponse(200, "", "Food is deleted successfully"));
  } catch (error) {
    next(error);
  }
};
const getFood = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const food = Food.aggregate();

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    Food.aggregatePaginate(food, options)
      .then((result) => {
        return res
          .status(200)
          .json(new ApiResponse(200, result, "Food is fetched successfully"));
      })
      .catch((error) => {
        throw new ApiError(
          500,
          `Due to server error food is not fetched successfully ${error}`
        );
      });
  } catch (error) {
    next(error);
  }
};
const createCategory = async (req, res, next) => {};
const deleteCategory = async (req, res, next) => {};
const updateCategory = async (req, res, next) => {};
const readCategory = async (req, res, next) => {};

export { addFood, updateFood, deleteFood, getFood };
