const db = require("../../db/connection");
const notes = db.get("notes");

exports.getNotesCB = async (req, res, next) => {
  let { skip = 0, limit = 5, sort = "desc" } = req.query;
  console.log("skip: ", skip, "limit: ", limit);
  skip = parseInt(skip) || 0;
  limit = parseInt(limit) || 5;

  console.log("skip: ", skip, "limit: ", limit);

  // version .then()

  // Promise.all([
  //   notes.count({ user_id: req.user._id }),
  //   notes.find(
  //     { user_id: req.user._id },
  //     {
  //       skip,
  //       limit,
  //       sort: {
  //         created: sort === "desc" ? -1 : 1,
  //       },
  //     }
  //   ),
  // ])
  //   .then(([total, userNotes]) => {
  //     res.json({
  //       userNotes,
  //       user: req.user,
  //       pagination: {
  //         total,
  //         skip,
  //         limit,
  //         has_more: total - (skip + limit) > 0,
  //       },
  //     });
  //   })
  //   .catch(next);

  // version async await

  try {
    const [total, userNotes] = await Promise.all([
      notes.count({ user_id: req.user._id }),
      notes.find(
        { user_id: req.user._id },
        {
          skip,
          limit,
          sort: {
            created: sort === "desc" ? -1 : 1,
          },
        }
      ),
    ]);

    res.json({
      userNotes,
      user: req.user,
      pagination: {
        total,
        skip,
        limit,
        has_more: total - (skip + limit) > 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.postNoteCB = (req, res, next) => {
  const note = {
    ...req.body,
    user_id: req.user._id,
    created: new Date(),
  };
  notes.insert(note);
  res.json(note);
};
