import React, { useContext } from "react";
import { TodosStateContext } from "../context/TodosStateContext";

const TodosStateBtnGrp = () => {
  const { btnState, btnDispatch } = useContext(TodosStateContext);

  const handleBtnClick = (e) => {
    let name = e.target.innerText;
    btnDispatch({
      type: "SET_STATE_BTN",
      payload: name,
    });
  };

  return (
    <div className="button-group">
      <button
        style={{
          background: btnState.stateBtn === "ACTIVE" ? "#d9d9d9" : "#ffffff",
        }}
        onClick={handleBtnClick}
      >
        ACTIVE
      </button>
      <button
        style={{
          background: btnState.stateBtn === "COMPLETED" ? "#d9d9d9" : "#ffffff",
        }}
        onClick={handleBtnClick}
      >
        COMPLETED
      </button>
      <button
        style={{
          background: btnState.stateBtn === "ALL" ? "#d9d9d9" : "#ffffff",
        }}
        onClick={handleBtnClick}
      >
        ALL
      </button>
    </div>
  );
};

export default TodosStateBtnGrp;
