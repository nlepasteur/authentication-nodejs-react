const express = require("express");

const router = express.Router();
const notesController = require("../controllers/notes");

router.get("/", notesController.getNotesCB);

router.post("/", notesController.postNoteCB);

module.exports = router;
