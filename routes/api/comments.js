const express = require('express');
const Comment = require('../../models/Comment');
const User = require('../../models/User');
const router = express.Router();
const config = require('config');
const userId = config.get('userid');

// @route    POST api/comments
// @desc     Create a post
router.post(
  '/',
  async (req, res) => {
    let userid = ""
    if (req.body.userid == null){
      userid = userId;
    }
    else{
      userid = req.body.userid 
    }
    try {
      console.log(req.body)
      const user = await User.findById(userid)
      console.log(user)
      const newComment = new Comment({
        text: req.body.text,
        name: user.name,
        user: user.id
      });

      const comment = await newComment.save();

      res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 });
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('', async (req, res) => {

  try {
    const comment = await Comment.findById(req.query.id);

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    // Check user
    if (comment.user.toString() !== userId) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await comment.remove();

    res.json({ msg: 'Comment removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;