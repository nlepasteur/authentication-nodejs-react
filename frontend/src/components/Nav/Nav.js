import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { setUsername } from "services/store/actions";
import Context from "services/store/context";

import "./Nav.scss";

const Nav = () => {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();

  function logout() {
    localStorage.removeItem("token");
    dispatch(setUsername(""));
    history.push("/login");
  }

  return !state.username ? (
    <nav className="navbar-wrapper">
      <div>
        <a href="/signup">Signup</a>
      </div>
      <div>
        <a href="/login">Login</a>
      </div>
    </nav>
  ) : (
    <nav className="navbar-wrapper">
      <div>
        <a href="/signup">Signup</a>
      </div>
      <div>
        <a href="/login">Login</a>
      </div>
      <div className="logged">
        <div>{state.username}</div>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Nav;
