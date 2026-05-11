// routes/comments.js

const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

// CREATE COMMENT
router.post("/", async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET COMMENTS BY POST
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId,
    }).sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE COMMENT
router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE COMMENT
router.delete("/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json("Comment deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
