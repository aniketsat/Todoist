import React, { useContext, useEffect, useState } from "react";
import TodoListItem from "./TodoListItem";
import TodosStateBtnGrp from "./TodosStateBtnGrp";
import { TodoContext } from "../context/TodoContext";
import { TodosStateContext } from "../context/TodosStateContext";
import { useCookies } from "react-cookie";

const TodoList = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["todos"]);

  const { todoState, todoDispatch } = useContext(TodoContext);
  const { btnState } = useContext(TodosStateContext);

  const [todos, setTodos] = useState(todoState.todos);

  useEffect(() => {
    todoDispatch({
      type: "SET_TODOS",
      payload: cookies.todos,
    });
  }, []);

  useEffect(() => {
    const getTodos = () => {
      switch (btnState.stateBtn) {
        case "ALL":
          return todoState.todos;
        case "ACTIVE":
          if (todoState.todos)
            return todoState.todos.filter((todo) => !todo.completed);
          return [];
        case "COMPLETED":
          if (todoState.todos)
            return todoState.todos.filter((todo) => todo.completed);
          return [];
        default:
          return todos;
      }
    };
    setTodos(getTodos());
    removeCookie("todos");
    setCookie("todos", todoState.todos, {
      path: "/",
      expires: new Date(2050, 1, 1),
    });
  }, [btnState, todoState]);

  const [title, setTitle] = useState("");

  const handleAddTodo = (e) => {
    if (e.key === "Enter") {
      todoDispatch({
        type: "ADD_TODO",
        payload: {
          id: todoState.todos.length + 1,
          title,
          completed: false,
        },
      });
      setTitle("");
    }
  };

  return (
    <div className="container">
      <h1 className="todo-list-heading">Todo List</h1>
      <input
        type="text"
        placeholder="Add a todo"
        className="input-add-todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleAddTodo}
      />
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </div>
      <TodosStateBtnGrp />
    </div>
  );
};

export default TodoList;
