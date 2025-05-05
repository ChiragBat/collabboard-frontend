import React, { useState } from "react";
import ColumnList from "./ColumnList";
import axios from "axios";

const BoardDetails = ({ board, onBoardUpdated }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const [boardNameValue, setBoardNameValue] = useState(board.name);
  const [boardDescriptionInputValue, setBoardDescriptionValue] = useState(
    board.description
  );

  if (!board) {
    return <div>No data for board</div>;
  }

  const saveBoard = async () => {
    const currentBoard = board.id;
    const newBoardName = boardNameValue;
    const newDescription = boardDescriptionInputValue;

    const updatePayload = {
      name: newBoardName,
      description: newDescription,
    };

    try {
      const response = await axios.put(
        `/api/boards/${currentBoard}`,
        updatePayload
      );
      console.log("Backend Put done");
      onBoardUpdated(response.data);
    } catch {
      console.log("Failed");
    } finally {
      setIsEditingName(false);
      setIsEditingDescription(false);
    }
  };

  const handleNameClick = () => {
    console.log("Board name clicked!");
    setIsEditingName(true);
    setBoardNameValue(board.name);
  };

  const handleDescriptionClick = () => {
    console.log("Board name clicked!");
    setIsEditingDescription(true);
    setBoardDescriptionValue(board.description);
  };

  const handleNameBlur = () => {
    setIsEditingName(false);
    saveBoard();
  };

  const handleDescriptionBlur = () => {
    setIsEditingDescription(false);
    saveBoard();
  };

  const handleNameInputKeyPress = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      setIsEditingName(false);
      saveBoard();
    }
  };

  const handleDescriptionInputKeyPress = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      setIsEditingDescription(false);
      saveBoard();
    }
  };

  const handleNameInputChange = (event) => {
    setBoardNameValue(event.target.value);
  };

  const handleDescriptionInputChange = (event) => {
    setBoardDescriptionValue(event.target.value);
  };
  return (
    <div className=" mt-2 w-full h-1/4 flex flex-col items-center justify-start gap-4">
      {isEditingName ? (
        <input
          type="text"
          value={boardNameValue}
          onChange={handleNameInputChange}
          onBlur={handleNameBlur}
          onKeyDown={handleNameInputKeyPress}
        ></input>
      ) : (
        <div>
          <h3 onClick={handleNameClick} className="text-2xl mt-2">
            {board.name}
          </h3>
        </div>
      )}
      {isEditingDescription ? (
        <textarea
          value={boardDescriptionInputValue}
          onChange={handleDescriptionInputChange}
          onKeyDown={handleDescriptionInputKeyPress}
          autoFocus
        />
      ) : (
        <div onClick={handleDescriptionClick}>
          <p className="italic text-1xl">{board.description}</p>
        </div>
      )}
    </div>
  );
};

export default BoardDetails;
