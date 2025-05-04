// src/components/BoardItemList.jsx
import React from "react";
import { Link } from "react-router-dom";

const BoardListItem = ({ board }) => {
  if (!board) {
    return null;
  }
  return (
    // li only for margin, remove key and other styling classes
    <li className="m-2">
      {/* Link gets styling, 'block', and width */}
      <Link
        to={`/board/${board.id}`}
        // Added 'block', using w-48 as an example, using rounded-md
        className="block w-48 p-4 bg-[#670D2F] rounded-md shadow-md hover:shadow-lg transition-shadow duration-200"
      >
        {/* Text styling on span */}
        <span className="text-white hover:text-pink-400 font-semibold w-full block h-full">
          {board.name}
        </span>
      </Link>
    </li>
  );
};

export default BoardListItem;
