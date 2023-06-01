const express = require('express');
const postRouter = express.Router();
const {postModel} = require("../model/post.model")
const {userModel} = require("../model/user.model");

// Create a new post
postRouter.post('/', async (req, res) => {
  // console.log(req.body);
  try {
    const { userId, title, questions,answers} = req.body;
    // Create a new post
    const post = await postModel.create({ user: userId, title, questions,answers});
    // Add the post's ID to the user's posts array
    await userModel.findByIdAndUpdate(userId, { $push: { posts: post._id } });

    res.status(201).json({Message :"Sucessfully Data Added"});
  } catch (error) {
    console.log(error)
    res.status(500).json({ Message: error.message });
  }
});

// Update a post
postRouter.patch('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, questions, answers,name,checkData } = req.body;

    const post = await postModel.findByIdAndUpdate(postId, { title, questions, answers,name,checkData}, { new: true });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the post' });
  }
});

// Delete a post
postRouter.delete('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    // Find the post and its associated user
    const post = await postModel.findById(postId);
    const user = await userModel.findById(post.user);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Remove the post's ID from the user's posts array
    await userModel.findByIdAndUpdate(user._id, { $pull: { posts: post._id } });

    // Delete the post
    await postModel.findByIdAndDelete(postId);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the post' });
  }
});

// Get all posts
postRouter.get('/data', async (req, res) => {
  const {search,titles,page = 1, limit =9 } =  req.query
  try {
    const filter ={}
    if (search) {
      filter.questions= { $regex: search, $options: 'i' };
    }
    if (titles) {
      const colorArray = titles.split(',').map(colors => colors.trim());
      filter.title = { $in: colorArray };
    }
    const count = await postModel.countDocuments(filter);
    let totalPages = 1
    if(count > limit) {
      totalPages = Math.ceil(count / limit)
    }
    const posts = await postModel.find(filter).populate("user","name").skip((page - 1) * limit)
    .limit(limit);
    res.json({
      totalPages,
      currentPage: parseInt(page),
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve the posts' });
  }
});

// Get a post by ID
postRouter.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await postModel.findById(postId).populate('User', 'name');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the post' });
  }
});

module.exports = {postRouter};
