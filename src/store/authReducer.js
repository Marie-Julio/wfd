export const initialState = {
    token: null,
    isAuthenticated: false,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          token: action.payload.token,
          // modele: action.payload.modele,
          // roles: action.payload.roles,
          isAuthenticated: true,
        };
      case 'LOGOUT':
        return {
          ...state,
          token: null,
          // modele: [],
          // roles: [],
          isAuthenticated: false,
        };
      default:
        return state;
    }
  };