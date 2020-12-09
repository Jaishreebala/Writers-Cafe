const express = require('express');
const { getAllWrittenWorks, getWrittenWorkById, createNewWrittenWork, updateWrittenWorkById, deleteWrittenWorkById, uploadPhotoForWrittenWork } = require('../controllers/writtenWorks');
const { protect } = require("../middleware/auth");
const router = express.Router();
const comments = require('../router/comments');
const advancedResults = require("../middleware/advancedResults");
const Writtenwork = require("../models/Writtenwork");

router.use("/:writtenworkId/comments", comments);

router
    .route("/")
    .get(advancedResults(Writtenwork, { path: 'author', select: 'firstName lastName' }, { path: 'comments', select: 'comment' }, true), getAllWrittenWorks)
    .post(protect, createNewWrittenWork)

router
    .route("/:id")
    .get(getWrittenWorkById)
    .put(protect, updateWrittenWorkById)
    .delete(protect, deleteWrittenWorkById)

router
    .route("/:id/photo")
    .put(protect, uploadPhotoForWrittenWork)

module.exports = router;