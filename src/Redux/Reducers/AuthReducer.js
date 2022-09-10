const initialState = {
  token: null,
  lang:"fr",
};

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    
      case "SET_CURRENT_USER":
      return {
        ...state,
        lang:action.lang
      };
    case "LOGOUT":
      return {
        token: null,
      };
    default:
      return state;
  }
}

export default AuthReducer;
