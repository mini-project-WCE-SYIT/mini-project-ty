import express from "express";
import { getFeedPosts, getUserPosts, likePost,getAllPostsInGivenTimeFrame, getAllPostsOfIdvInGivenTimeFrame,generatePDF, generatePDFForAllUsers } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", getUserPosts);
router.get("/timeframe/:startDate/:endDate", verifyToken, getAllPostsInGivenTimeFrame);
/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.get("/timeframe/:startDate/:endDate", getAllPostsInGivenTimeFrame);
router.get("/timeframe/:_id/:startDate/:endDate", getAllPostsOfIdvInGivenTimeFrame);
router.get("/generatePdf/:_id", generatePDF);
router.get("/generatePDFForAllUsers/:startDate/:endDate", generatePDFForAllUsers);
export default router;

