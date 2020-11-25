const express = require('express');
const { getAllWrittenWorks, getWrittenWorkById, createNewWrittenWork, updateWrittenWorkById, deleteWrittenWorkById, uploadPhotoForWrittenWork } = require('../controllers/writtenWorks');
const { protect } = require("../middleware/auth")
const router = express.Router();

router
    .route("/")
    .get(getAllWrittenWorks)
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