import mongoose, { isValidObjectId } from "mongoose";
import { Foods as Food } from "../models/food.models.js";
import { Category } from "../models/category.models.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import fs from "fs";
import asyncHandler from "../utils/asyncHandler.js";
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
    const food = Food.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
          pipeline: [
            {
              $project: {
                category: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          category: {
            $first: "$category",
          },
        },
      },
    ]);

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
const createCategory = asyncHandler(async (req, res, next) => {
  const { category } = req.body;
  if (!category?.trim()) throw new ApiError(400, "Category is required");

  const createCat = await Category.create({
    category,
  });
  return res
    .status(201)
    .json(new ApiResponse(200, createCat, "Category is created successfully"));
});
const deleteCategory = async (req, res, next) => {
  try {
    const { catId } = req.params;
    if (!isValidObjectId(catId)) throw new ApiError("Invalid category id");

    const deleteCat = await Category.findByIdAndDelete(catId);
    if (!deleteCat) throw new ApiError(200, "Category is not found");
    return res
      .status(200)
      .json(new ApiResponse(200, "", "Category is deleted successfully"));
  } catch (error) {
    next(error);
  }
};
const deleteMany = async (req, res, next) => {
  try {
    const { idList = [] } = req.body;
    if (!idList.every((id) => isValidObjectId(id)))
      throw new ApiError(400, "Category id must valid and required");

    const deleteMany = await Category.deleteMany({ _id: { $in: idList } });
    if (deleteMany.deletedCount <= 0)
      throw new ApiError(400, "Category id is not found");
    return res
      .status(200)
      .json(
        new ApiResponse(200, "", "All give category is deleted successfully")
      );
  } catch (error) {
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    console.log(req.body, "Hello i am here");
    const { catId, category = "" } = req.body;
    if (!isValidObjectId(catId)) throw new ApiError(400, "Invalid category id");
    if (!category.trim()) throw new ApiError("Category is required");

    const updatedData = await Category.findByIdAndUpdate(
      catId,
      { category },
      { new: true }
    ).lean();
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedData, "Category is updated successfully")
      );
  } catch (error) {
    next(error);
  }
};
const readCategory = async (_, res, next) => {
  try {
    const catData = await Category.find().lean();
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          catData,
          `${
            catData.length <= 0
              ? "Category is empty"
              : "Category is fetched successfully"
          }`
        )
      );
  } catch (error) {
    next(error);
  }
};
const getFoodById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw new ApiError(400, "Food id is required");
    const data = await Food.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
          pipeline: [
            {
              $project: {
                category: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          category: {
            $first: "$category",
          },
        },
      },
    ]);
    if (!data) {
      throw new ApiError(404, "Food is not found");
    }
    return res.status(200).json(new ApiResponse(200, data[0]));
  } catch (error) {
    next(error);
  }
};

export {
  addFood,
  updateFood,
  deleteFood,
  getFood,
  createCategory,
  deleteCategory,
  updateCategory,
  readCategory,
  deleteMany,
  getFoodById,
};
