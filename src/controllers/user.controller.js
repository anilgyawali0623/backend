import { asyncHandler } from "../utils/asyncHandler.js";

const registerUSer = asyncHandler(async (req, res) => {
  res.status(500).json({
    message: "chai and code",
  });
});

 export {registerUSer};