import React, { useReducer } from "react";

const TodosStateContext = React.createContext();

const initialState = {
  stateBtn: "ACTIVE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STATE_BTN":
      return {
        ...state,
        stateBtn: action.payload,
      };
    default:
      return state;
  }
};

const TodosStateContextProvider = (props) => {
  const [btnState, btnDispatch] = useReducer(reducer, initialState);

  return (
    <TodosStateContext.Provider value={{ btnState, btnDispatch }}>
      {props.children}
    </TodosStateContext.Provider>
  );
};

export { TodosStateContext, TodosStateContextProvider };
