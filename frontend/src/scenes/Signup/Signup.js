import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Context from "services/store/context";
import { setInput, setErrorMessage } from "services/store/actions";
import validatePassword from "utils/validatePassword";

import { ReactComponent as Spin } from "assets/spin.svg";

import "./Signup.scss";

const SIGNUP_URL = "/auth/signup";

const Signup = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(Context);

  function setInputs(e) {
    const value = e.target.value.replace(" ", "");
    dispatch(setInput(e.target.name, value));
    if (
      state.errorMessage &&
      state.errorMessage.includes("word") &&
      e.target.name.includes("word")
    ) {
      dispatch(setErrorMessage(""));
    }
    if (
      state.errorMessage &&
      state.errorMessage.includes("username") &&
      e.target.name === "username"
    ) {
      dispatch(setErrorMessage(""));
    }
  }

  async function signup(e) {
    e.preventDefault();
    if (validUser()) {
      dispatch({ type: "SET_SIGNINUP", boolean: true });
      try {
        const body = {
          username: state.signupFormInputs.username,
          password: state.signupFormInputs.password,
        };

        const req = await fetch(SIGNUP_URL, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "content-type": "application/json",
          },
        });

        let response = await req.json();

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
    if (
      state.signupFormInputs.password !== state.signupFormInputs.confirmPassword
    ) {
      dispatch(setErrorMessage("Passwords do not match."));
      return false;
    }
    if (validatePassword(state.signupFormInputs.password)) {
      return true;
    } else {
      dispatch(setErrorMessage("Password is invalid"));
      return false;
    }
  }

  return (
    <div className="signup-wrapper">
      {state.signinUp ? <Spin /> : null}
      <div>{state.errorMessage}</div>
      {!state.signinUp && (
        <form onSubmit={signup}>
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
          </div>

          <div className="field">
            <input
              type="password"
              name="confirmPassword"
              className="input"
              placeholder=" "
              required
              onChange={setInputs}
              value={state.signupFormInputs.confirmPassword}
            />
            <div className="label-wrapper">
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
            </div>
          </div>

          <div className="strength">
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
            <span className="bar bar-4"></span>
          </div>

          <ul>
            <li> must be at least 5 characters</li>
            <li> must contain a capital letters</li>
            <li> must contain a number</li>
            <li> must contain one of $&+,:;=?@#</li>
          </ul>

          <input type="submit" />
        </form>
      )}
    </div>
  );
};

export default Signup;
