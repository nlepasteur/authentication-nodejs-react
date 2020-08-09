export const initialState = {
  errorMessage: "",
  signupFormInputs: {
    username: "",
    password: "",
    confirmPassword: "",
  },
  signinUp: false,
  username: "",
  newNote: {
    title: "",
    note: "",
  },
  notes: [],
  validations: [],
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
    case "SET_USERNAME":
      return {
        ...state,
        username: action.username,
      };
    case "NEW_NOTE":
      return {
        ...state,
        newNote: {
          title: action.newNote.title,
          note: action.newNote.note,
        },
      };
    case "SET_USER_NOTES":
      console.log("state.note", state.notes);
      return {
        ...state,
        notes: [...state.notes, ...action.userNotes],
      };
    case "SET_VALIDATIONS":
      return {
        ...state,
        validations: action.validations,
      };
    default:
      return state;
  }
};
