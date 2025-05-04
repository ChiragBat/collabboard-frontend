import React from "react";
import Card from "./Card";

const Column = ({ column }) => {
  if (!column) {
    return null;
  }
  const cards = column.cards && Array.isArray(column.cards) ? column.cards : [];
  return (
    <div className="column bg-[#670D2F] p-2 rounded-xl">
      <h3 className="underline">{column.name}</h3>
      <div className="card-list">
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
