import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Context from "services/store/context";
import { setInput, setErrorMessage } from "services/store/actions";
import validatePassword from "utils/validatePassword";

import { ReactComponent as Spin } from "assets/spin.svg";

import "./Login.scss";

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
    if (validatePassword(state.signupFormInputs.password).strength) {
      return true;
    } else {
      dispatch(setErrorMessage("Password is invalid"));
      return false;
    }
  }

  return (
    <div className="login-wrapper">
      {state.signinUp ? <Spin /> : null}
      {state.errorMessage && <div className="error">{state.errorMessage}</div>}
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
            <div className="label-wrapper">
              <label htmlFor="username" className="label">
                Username
              </label>
            </div>
          </div>

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
            <div className="label-wrapper">
              <label htmlFor="password" className="label">
                Password
              </label>
            </div>
            {/* <span className="showPassword">SHOW PASSWORD</span> */}
          </div>

          <input type="submit" />
        </form>
      )}
    </div>
  );
}

export default Login;
