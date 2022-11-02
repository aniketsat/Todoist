import React, { useReducer } from "react";

const TodoContext = React.createContext();

const initialState = {
  todos: [
    {
      id: 1,
      title: "Todo 1",
      completed: false,
    },
    {
      id: 2,
      title: "Todo 2",
      completed: false,
    },
    {
      id: 3,
      title: "Todo 3",
      completed: false,
    },
    {
      id: 4,
      title: "Todo 4",
      completed: true,
    },
    {
      id: 5,
      title: "Todo 5",
      completed: true,
    },
  ],
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
