const express = require("express");

const router = express.Router();
const Post = require("../models/Post");

// Get all the posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(404).send({ massage: error });
  }
});

// Submits the post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.status(404).send({ massage: error });
  }

  //   post
  //     .save()
  //     .then(data => {
  //       res.json(data);
  //     })
  //     .catch(error => res.status(404).json({ message: error }));
});

// Get Specific post

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    res.send({ message: error });
  }
});

// Delete Specific Post

router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (error) {
    res.send({ message: error });
  }
});

// Update a Post

router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      {
        $set: {
          title: req.body.title
        }
      }
    );

    res.json(updatedPost);
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = router;
