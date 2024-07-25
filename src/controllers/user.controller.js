import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const registerUSer = asyncHandler(async (req, res) => {
  //  check for images check for avator
  //  upload them to cloudinary , avtor
  // create user object create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  //  get user details from frontend
  const { fullName, email, username, password } = req.body;

  //  validation not empty
  if (
    [fullName, email, username, password].some((filed) => filed?.trim() === "")
  ) {
    throw new ApiError(400, "all fields are required");
  }

  //  check if user already exists username , email
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(400, "User with email or username already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // this part exclude passwrod and the refreshtoken
   const createdUser= await User.findById(user._id).select("-password -refreshToken")


    if(!createdUser){
         throw new ApiError(500, "something went wrong while registering the user");
    }

     return res.status(201).json(
          new ApiResponse(200, createdUser, "user registerd succesfully")
     )
});

export { registerUSer };
