import React from "react";

import "./Note.scss";

const Note = ({ index, note: { title, note } }) => {
  return (
    <div key={index} className="Note">
      <div className="Note__title">{title}</div>
      <div className="Note__note">{note}</div>
    </div>
  );
};

export default Note;
