const db = require("../../db/connection");
const notes = db.get("notes");

exports.getNotesCB = async (req, res, next) => {
  try {
    if (req.user) {
      const userNotes = await notes.find({
        user_id: req.user._id,
      });
      res.json({ userNotes, user: req.user });
    }
  } catch (error) {
    next(error);
  }
};

exports.postNoteCB = (req, res, next) => {
  const note = {
    ...req.body,
    user_id: req.user._id,
  };
  notes.insert(note);
  res.json(note);
};
