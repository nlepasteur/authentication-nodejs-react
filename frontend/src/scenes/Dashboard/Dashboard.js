import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import Context from "services/store/context";
import { newNote, setUserNotes, setUsername } from "services/store/actions";

import "./Dashboard.scss";

const Dashboard = () => {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();

  const API_URL = "api/notes";

  useEffect(() => {
    getUsernameAndNotes();
  }, []);

  function logout() {
    localStorage.removeItem("token");
    history.push("/login");
  }

  function controlInputs(e) {
    const target = e.target.name;
    const note = {
      ...state.newNote,
      [target]: e.target.value,
    };
    dispatch(newNote(note));
  }

  async function addNote(e) {
    e.preventDefault();
    const req = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(state.newNote),
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
    });

    const response = await req.json();

    state.notes.push(response);

    dispatch(
      newNote({
        title: "",
        note: "",
      })
    );
  }

  async function getUsernameAndNotes() {
    const req = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const response = await req.json();
    dispatch(setUsername(response.user.username));
    dispatch(setUserNotes(response.userNotes));
  }

  function renderNotes() {
    return state.notes.map((note, index) => (
      <div key={index}>
        <div>{note.title}</div>
        <div>{note.note}</div>
      </div>
    ));
  }

  return (
    <div className="dashboard-wrapper">
      <form onSubmit={addNote} className="form-wrapper">
        <label>Title</label>
        <input
          value={state.newNote.title}
          name="title"
          type="text"
          placeholder="enter a title"
          onChange={controlInputs}
          required
        />
        <small>Enter a descriptive title for your notes.</small>
        <label>note</label>
        <textarea
          value={state.newNote.note}
          name="note"
          id="note"
          onChange={controlInputs}
          required
        />
        <input type="submit"></input>
      </form>
      {state.notes && renderNotes()}
    </div>
  );
};

export default Dashboard;
