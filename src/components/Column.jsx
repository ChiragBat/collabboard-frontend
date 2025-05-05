import React from "react";
import Card from "./Card";

const Column = ({ column, boardId, onDelete }) => {
  const handleDeleteColumn = (event) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete(column.id);
    }
  };
  if (!column) {
    return null;
  }
  const cards = column.cards && Array.isArray(column.cards) ? column.cards : [];
  return (
    <div className="column bg-[#670D2F] p-2 rounded-xl relative flex flex-col items-center gap-2">
      <div
        className="absolute cursor-pointer top-2 right-2 z-10"
        onClick={handleDeleteColumn}
      >
        🗑️
      </div>
      <h3 className="underline">{column.name}</h3>
      <div className="card-list flex flex-col gap-2">
        {cards.length === 0 ? (
          <p>No cards yet</p>
        ) : (
          cards.map((card) => <Card key={card.id} card={card} />)
        )}
      </div>
    </div>
  );
};
export default Column;
