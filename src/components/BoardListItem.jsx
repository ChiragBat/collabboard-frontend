// src/components/BoardItemList.jsx
import React from "react";
import { Link } from "react-router-dom";

const BoardListItem = ({ board, onDelete }) => {
  if (!board) {
    return null;
  }
  const handleDeleteClick = (event) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete(board.id);
    }
  };
  return (
    <li className="m-2 relative">
      <div
        className="absolute cursor-pointer top-2 right-2"
        onClick={handleDeleteClick}
      >
        🗑️
      </div>
      <Link
        to={`/board/${board.id}`}
        className="block w-48 p-4 bg-[#670D2F] rounded-md shadow-md hover:shadow-lg transition-shadow duration-200"
      >
        <span className="text-white hover:text-pink-400 font-semibold w-full block h-full">
          {board.name}
        </span>
      </Link>
    </li>
  );
};

export default BoardListItem;
