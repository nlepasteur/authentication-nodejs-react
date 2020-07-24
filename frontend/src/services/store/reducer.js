export const initialState = {
  errorMessage: "",
  signupFormInputs: {
    username: "",
    password: "",
    confirmPassword: "",
  },
  signinUp: false,
  userIDS: {},
  newNote: {
    title: "",
    note: "",
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT":
      const target = action.target;
      return {
        ...state,
        signupFormInputs: {
          ...state.signupFormInputs,
          [target]: action.value,
        },
      };
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case "SET_SIGNINUP":
      return {
        ...state,
        signinUp: action.boolean,
      };
    case "SET_USER_INFOS":
      return {
        ...state,
        userIDS: {
          username: action.username,
          id: action.id,
          roles: action.roles,
        },
      };
    case "NEW_NOTE":
      return {
        ...state,
        newNote: {
          title: action.newNote.title,
          note: action.newNote.note,
        },
      };

    default:
      return state;
  }
};
