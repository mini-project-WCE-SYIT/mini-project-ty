import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    branch: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    titleOfAchievement:String,
    titleOfProject:String,
    eventName: String,
    startDate:String,
    endDate:String,
    activityType:String,
    rank:String,
    location:String,
    organizedBy:String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
