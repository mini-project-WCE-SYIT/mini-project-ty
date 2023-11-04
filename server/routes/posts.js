import express from "express";
import { getFeedPosts, getUserPosts, likePost,getAllPostsInGivenTimeFrame } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.get("/timeframe/:startDate/:endDate", getAllPostsInGivenTimeFrame);

export default router;

