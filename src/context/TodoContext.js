import React, { useReducer } from "react";

const TodoContext = React.createContext();

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

const TodoContextProvider = (props) => {
  const [todoState, todoDispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={{ todoState, todoDispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoContextProvider };
