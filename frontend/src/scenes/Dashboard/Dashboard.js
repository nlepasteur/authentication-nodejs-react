import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import Context from "services/store/context";
import { setUserIDS, newNote } from "services/store/actions";
import { initialState } from "../../services/store/reducer";

const Dashboard = () => {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();

  // const API_URL = "http://localhost:5000";

  // useEffect(() => {
  //   mounted();
  // }, []);

  function logout() {
    localStorage.removeItem("token");
    // state doit être de nouveau initialState
    history.push("/login");
  }

  // async function mounted() {
  //   const req = await fetch(API_URL, {
  //     headers: {
  //       authorization: `Bearer ${localStorage.token}`,
  //     },
  //   });
  //   const response = await req.json();
  //   if (response.user) {
  //     getNotes();
  //     dispatch(
  //       setUserIDS({ username: response.user.username, id: response.user._id })
  //     );
  //   } else {
  //     logout();
  //   }
  // }

  function controlInputs(e) {
    const target = e.target.name;
    const note = {
      ...state.newNote,
      [target]: e.target.value,
    };
    dispatch(newNote(note));
  }

  // async function addNotes(e) {
  //   e.preventDefault();
  //   const req = await fetch("http://localhost:5000/api/v1/notes", {
  //     method: "POST",
  //     body: JSON.stringify(state.newNote),
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem("token")}`,
  //       "content-type": "application/json",
  //     },
  //   });

  //   const response = await req.json();
  //   console.log("response: ", response);
  //   dispatch(
  //     newNote({
  //       title: "",
  //       note: "",
  //     })
  //   );
  // }

  // async function getNotes() {
  //   const req = await fetch("http://localhost:5000/api/v1/notes", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  //   const response = await req.json();
  //   console.log("response from get notes: ", response);
  // }

  return (
    <div>
      <button onClick={logout}>Logout</button>

      {/* <form onSubmit={addNotes}>
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
      </form> */}
    </div>
  );
};

export default Dashboard;
