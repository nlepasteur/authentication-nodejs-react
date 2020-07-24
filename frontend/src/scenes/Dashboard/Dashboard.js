import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import Context from "services/store/context";
import { newNote } from "services/store/actions";

const Dashboard = () => {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();

  const API_URL = "api/notes";

  useEffect(() => {
    getNotes();
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

  async function addNotes(e) {
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
    console.log("response: ", response);
    dispatch(
      newNote({
        title: "",
        note: "",
      })
    );
  }

  async function getNotes() {
    const req = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const response = await req.json();
    console.log("response from get notes: ", response);
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
      Dashboard
      <div>Welcome {state.userIDS.username}</div>
      <form onSubmit={addNotes}>
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
    </div>
  );
};

export default Dashboard;
