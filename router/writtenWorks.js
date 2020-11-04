const express = require('express');
const { getAllWrittenWorks, getWrittenWorkById, createNewWrittenWork, updateWrittenWorkById, deleteWrittenWorkById } = require('../controllers/writtenWorks');
const router = express.Router();

router
    .route("/")
    .get(getAllWrittenWorks)
    .post(createNewWrittenWork)

router
    .route("/:id")
    .get(getWrittenWorkById)
    .put(updateWrittenWorkById)
    .delete(deleteWrittenWorkById)

module.exports = router;