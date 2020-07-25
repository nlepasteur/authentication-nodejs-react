export const setInput = (targetName, value) => {
  return {
    type: "SET_INPUT",
    target: targetName,
    value: value,
  };
};

export const setErrorMessage = (errorMessage) => {
  return {
    type: "SET_ERROR_MESSAGE",
    errorMessage,
  };
};

export const setSigninup = (boolean) => {
  return {
    type: "SET_SIGNINUP",
    boolean,
  };
};

export const newNote = ({ title, note }) => {
  return {
    type: "NEW_NOTE",
    newNote: {
      title,
      note,
    },
  };
};

export const setUsername = (username) => {
  return {
    type: "SET_USERNAME",
    username,
  };
};

export const setUserNotes = (userNotes) => {
  return {
    type: "SET_USER_NOTES",
    userNotes,
  };
};

export const setValidations = (validations) => {
  return {
    type: "SET_VALIDATIONS",
    validations,
  };
};
