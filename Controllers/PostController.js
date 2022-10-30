import PostModel from "../Model/postModel.mjs";
import mongoose from "mongoose";
import userModel from "../Model/UserModel.mjs";

// create new post
export const createPost = async (req, res) => {
  console.log(req.body)
  const newPost = new PostModel(req.body);
 
  try {
    await newPost.save();
    console.log(newPost)
    res.status(200).json(newPost);
    
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a  post
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id);

    res.status(200).json(post);
  } catch {
    res.status(500).json(error);
  }
};

// upadte a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
// delete post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted successfully");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
// like and dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post Liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post UnLiked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// get timeline post
export const getTimelinePost = async (req, res) => {
  const userId = req.params;
  try {
    const currentUserPost = await PostModel.find({ userId: userId });
    const followingPost = await userModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "post",
          localField: "following",
          foreignField: "userId",
          as: "followingPost",
        },
      },
      {
        $project: {
          followingPost: 1,
          _id: 0,
        },
      },
    ]);
    res
      .status(200)
      .json(currentUserPost.concat(...followingPost[0].followingPost));
  } catch {
    res.status(500).json(error);
  }
};
