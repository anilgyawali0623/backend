import { Router } from "express";
import { registerUSer } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.route("/register").post(registerUSer);
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUSer
);
export default router;
