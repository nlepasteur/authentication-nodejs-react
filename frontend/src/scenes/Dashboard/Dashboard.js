import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Context from "services/store/context";
import { newNote, setUserNotes, setUsername } from "services/store/actions";

import Note from "./Note/Note";

import "./Dashboard.scss";

const Dashboard = () => {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();
  let [skip, setSkip] = useState(0);
  let [limit, setLimit] = useState(2);
  let [finished, setFinished] = useState(false);

  const API_URL = `api/notes?skip=${skip}&limit=${limit}`;

  useEffect(() => {
    getUsernameAndNotes();
  }, []);

  // function logout() {
  //   localStorage.removeItem("token");
  //   history.push("/login");
  // }

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
    console.log("SKIP: ", skip);
    const req = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const response = await req.json();
    console.log("RESPONSE: ", response);
    if (response.pagination.has_more) {
      console.log(response.pagination.has_more);
    } else {
      setFinished(true);
    }
    dispatch(setUsername(response.user.username));
    dispatch(setUserNotes(response.userNotes));
  }

  function renderNotes() {
    return state.notes.map((note, index) => <Note key={index} note={note} />);
  }

  function loadMore() {
    setSkip((skip += limit));
    getUsernameAndNotes();
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

      {!finished && <button onClick={loadMore}>Load more</button>}
    </div>
  );
};

export default Dashboard;
