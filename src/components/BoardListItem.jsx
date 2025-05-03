import React from "react";
import { Link } from "react-router-dom";

const BoardItemList = ({ board }) => {
  if (!board) {
    return null;
  }
  return (
    <li key={board.id}>
      <Link to={`/board/${board.id}`}>{board.name}</Link>
    </li>
  );
};
export default BoardItemList;
