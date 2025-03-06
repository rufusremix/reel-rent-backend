import { createContext, useReducer } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const authReducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          user: {
            name: action.authData.name,
            isAdmin: action.authData.isAdmin,
          },
          accessToken: action.authData.accessToken,
        };
      case "logout":
        return null;

      case "refresh":
        return { ...state, accessToken: action.authData.accessToken };
    }
  };

  const [auth, dispatch] = useReducer(authReducer);
  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
