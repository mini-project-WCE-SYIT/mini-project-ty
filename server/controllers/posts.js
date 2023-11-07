import Post from "../models/Post.js";
import User from "../models/User.js";
import ejs from 'ejs';
import puppeteer from 'puppeteer'
/* CREATE */
export const createPost = async (req, res) => {
	try {
		const {
			userId,
			description,
			titleOfAchievement,
			titleOfProject,
			eventName,
			activityType,
			location,
			organizedBy,
			picturePath,
			startDate,
			endDate,
      rank
		} = req.body;
    console.log(titleOfAchievement,titleOfProject);
		const user = await User.findById(userId);
		const newPost = new Post({
			userId,
			firstName: user.firstName,
			lastName: user.lastName,
			branch: user.branch,
			description,
			eventName,
			startDate,
			endDate,
			activityType,
			location,
      titleOfAchievement,
      titleOfProject,
      rank,
			organizedBy,
			userPicturePath: user.picturePath,
			picturePath,
			likes: {},
			comments: [],
		});
		await newPost.save();
		res.status(201).json(newPost);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

/* READ */
export const getFeedPosts = async (req, res) => {
	try {
		const post = await Post.find();
		res.status(200).json(post);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const getUserPosts = async (req, res) => {
	try {
		const { userId } = req.params;
		const post = await Post.find({ userId });
		res.status(200).json(post);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

/* UPDATE */
export const likePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;
		const post = await Post.findById(id);
		const isLiked = post.likes.get(userId);

		if (isLiked) {
			post.likes.delete(userId);
		} else {
			post.likes.set(userId, true);
		}

		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{ likes: post.likes },
			{ new: true }
		);

		res.status(200).json(updatedPost);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const getAllPostsInGivenTimeFrame = async (req, res) => {
	try {
		const { startDate, endDate } = req.params;
		// console.log(startDate,endDate);
		const posts = await Post.find({
			createdAt: { $gte: startDate, $lt: endDate },
		});
		res.status(200).json(posts);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const activities = [
  {
      faculty: 'John Doe',
      name: 'Teaching',
      research: 'Research Paper 1',
      thesis: 'Master\'s Thesis',
      scholarship: 'Scholarship 1',
      description: 'Description 1',
      organised: 'Organization A',
      date: '2023-11-07',
  },
  {
      faculty: 'Jane Smith',
      name: 'Research',
      research: 'Research Paper 2',
      thesis: 'Ph.D. Thesis',
      scholarship: 'Scholarship 2',
      description: 'Description 2',
      organised: 'Organization B',
      date: '2023-11-08',
  },
  // Add more activity objects as needed
];


export const generatePDF = async (req, res) => {
	const {_id} = req.params;
	const  user = await User.findById(_id);
	if(!user){
		return res.status(404).json({msg:'User not found'});
	}
	const posts = await Post.find({userId: user._id});
	if(!posts){
		return res.status(404).json({msg:'User dosent have any posts'});
	}
	const date = new Date();
	return res.render('first',{
		period: 'June to July 2023',
		currentDate: date.toString().substring(0,15),
		activities: posts,
	});

};