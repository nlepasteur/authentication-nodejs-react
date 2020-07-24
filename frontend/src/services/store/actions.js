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

export const setUserInfos = ({ username, id, roles }) => {
  return {
    type: "SET_USER_INFOS",
    username,
    id,
    roles,
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
