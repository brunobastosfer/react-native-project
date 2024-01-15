import React, { createContext, useReducer, useContext } from "react";

const AppContext = createContext();

const initialState = {
  token: null,
  links: [],
};

const actionTypes = {
  SET_TOKEN: "SET_TOKEN",
  SET_LINKS: "SET_LINKS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return { ...state, token: action.payload };
    case actionTypes.SET_LINKS:
      return { ...state, links: action.payload };

    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, useAppContext, actionTypes };
