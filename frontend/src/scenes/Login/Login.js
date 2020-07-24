import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Context from "services/store/context";
import {
  setInput,
  setErrorMessage,
  setUserInfos,
} from "services/store/actions";
import validatePassword from "utils/validatePassword";

import { ReactComponent as Spin } from "assets/spin.svg";

const LOGIN_URL = "/auth/login";

function Login() {
  const history = useHistory();
  const { state, dispatch } = useContext(Context);

  function setInputs(e) {
    const value = e.target.value.replace(" ", "");
    dispatch(setInput(e.target.name, value));
    if (state.errorMessage) {
      dispatch(setErrorMessage(""));
    }
  }

  async function login(e) {
    e.preventDefault();
    if (validUser()) {
      dispatch({ type: "SET_SIGNINUP", boolean: true });
      try {
        const body = {
          username: state.signupFormInputs.username,
          password: state.signupFormInputs.password,
        };

        const req = await fetch(LOGIN_URL, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "content-type": "application/json",
          },
        });

        let response = await req.json();

        console.log("response", response);

        if (req.ok) {
          dispatch({ type: "SET_SIGNINUP", boolean: false });
          dispatch(
            setUserInfos({
              username: response.user.username,
              id: response.user._id,
              roles: response.user.roles,
            })
          );
          localStorage.token = response.token;
          history.push("/dashboard");
          return;
        } else {
          dispatch({ type: "SET_SIGNINUP", boolean: false });
          throw new Error(response.message);
        }
      } catch (error) {
        dispatch(setErrorMessage(error.message));
      }
    }
  }

  function validUser() {
    if (validatePassword(state.signupFormInputs.password)) {
      return true;
    } else {
      dispatch(setErrorMessage("Password is invalid"));
      return false;
    }
  }

  return (
    <div>
      {state.signinUp ? <Spin /> : null}
      <div>{state.errorMessage}</div>
      {state.signinUp ? null : (
        <form onSubmit={login}>
          <div className="field">
            <input
              type="text"
              name="username"
              className="input"
              placeholder=" "
              required
              onChange={setInputs}
              value={state.signupFormInputs.username}
            />
            {/* ariaDescribedly="usernameHelp" */}
            <label htmlFor="username" className="label">
              Username
            </label>
          </div>
          {/* <!-- <small id="usernameHelp" className="form-text text-muted">Username must be longer than 2 characters and shorter than */}
          {/* 30. Username can only contain
  alphanumeric characters and under_scores</small> --> */}

          <div className="field">
            <input
              type="password"
              name="password"
              className="input passwordInput"
              placeholder=" "
              required
              onChange={setInputs}
              value={state.signupFormInputs.password}
            />
            {/* ariaDescribedby="passwordHelp" */}
            <label htmlFor="password" className="label">
              Password
            </label>
            <span className="showPassword">SHOW PASSWORD</span>
          </div>
          {/* <!-- <small id="passwordHelp" className="form-text text-muted">Password must be longer than 10 characters.</small> --> */}

          <input type="submit" />
        </form>
      )}
    </div>
  );
}

export default Login;
