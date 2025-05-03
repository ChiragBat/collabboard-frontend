import React, { useState } from "react";
import ColumnList from "./ColumnList";

const BoardDetails = ({ board }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [boardNameInputValue, setBoardNameInputValue] = useState(board.name);
  const [boardDescriptionInputValue, setBoardDescriptionValue] = useState(
    board.description
  );

  if (!board) {
    return <div>No data for board</div>;
  }
  const handleNameClick = () => {
    console.log("Board name clicked!");
    setIsEditingName(true);
    setBoardNameInputValue(board.name);
  };
  const handleNameBlur = () => {
    setIsEditingName(false);
  };
  const handleNameInputKeyPress = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      setIsEditingName(false);
    }
  };
  const handleNameInputChange = (event) => {
    setBoardNameInputValue(event.target.value);
  };
  return (
    <div>
      {isEditingName ? (
        <input
          type="text"
          value={boardNameInputValue}
          onChange={handleNameInputChange}
          onBlur={handleNameBlur}
          onKeyDown={handleNameInputKeyPress}
        ></input>
      ) : (
        <div>
          <h3 onClick={handleNameClick}>{board.name}</h3>
          <p>{board.description}</p>
          <ColumnList columns={board.columns} />
        </div>
      )}
    </div>
  );
};

export default BoardDetails;
