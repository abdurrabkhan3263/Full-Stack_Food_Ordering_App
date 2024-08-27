import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// cookie option
const option = {
  httpOnly: true,
  secure: true,
};

// Create user
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // CHECKING USER IF ALREADY EXITS OR NOT
  const user = await User.findOne({ email });
  if (user) throw new ApiError(400, "User with email is already exists");

  //   VALIDATION IS USERS ALL FIELDS ARE THERE OR NOT
  if ([name, email, password].some((items) => items.trim() === ""))
    throw new ApiError(400, "All field name,email and password is required");

  if (!validator.isEmail(email))
    throw new ApiError(400, "Please enter valid email");
  if (password.trim().length < 8)
    throw new ApiError(400, "Please enter a strong password");

  const createdUser = await User.create({ name, email, password });

  const jsObject = createdUser.toObject();

  const { password: jsPassword, ...newObj } = jsObject;

  return res
    .status(201)
    .json(new ApiResponse(201, newObj, "User is created successfully"));
});
// Log-in User
const loginUser = asyncHandler(async (req, res) => {
  const { email = "", password = "" } = req.body;

  if (!email.trim() || !password.trim())
    throw new ApiError(400, "Email and password is required");
  const fUser = await User.findOne({ email });
  if (!fUser) throw new ApiError(404, "User with email is not found");

  const isPasswordCorrect = await bcrypt.compare(password, fUser.password);
  if (!isPasswordCorrect) throw new ApiError(400, "Invalid user credential");

  const refreshToken = await jwt.sign(
    { email, id: fUser.id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, option)
    .json(new ApiResponse(200, "", "User is logged in successfully"));
});

export { createUser, loginUser };
