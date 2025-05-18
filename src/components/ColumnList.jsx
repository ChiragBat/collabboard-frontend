import React from "react";
import Column from "./Column";
import axios from "axios";

const ColumnList = ({ columns, boardId, onColumnDeleted, onCardCreated }) => {
  const handleDeleteCol = async (columnId) => {
    const isConfirmed = window.confirm(
      "Are u sure you want to delete this column"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`/api/boards/${boardId}/columns/${columnId}`);
        if (onColumnDeleted) {
          onColumnDeleted(columnId);
        }
      } catch (e) {
        alert("Please try again");
      }
    }
  };
  if (!columns || columns.length === 0) {
    return <div>No columns found</div>;
  }
  return (
    <div className="column-list flex flex-row w-screen gap-5 justify-around overflow-x-auto ">
      {columns.map((column) => (
        <div key={column.id} className="column-element">
          <Column
            column={column}
            onDelete={handleDeleteCol}
            onCardCreated={onCardCreated}
            boardId={boardId}
          />
        </div>
      ))}
    </div>
  );
};

export default ColumnList;
