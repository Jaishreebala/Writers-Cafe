const express = require('express');
const router = express.Router({ mergeParams: true });
const { getAllComments, addComment, updateComment } = require("../controllers/comments")
const { protect } = require("../middleware/auth");
router
    .route("/")
    .get(getAllComments)
    .post(protect, addComment)

router
    .route("/:id")
    .put(protect, updateComment)
module.exports = router