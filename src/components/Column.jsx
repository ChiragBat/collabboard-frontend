import React from "react";
import Card from "./Card";

const Column = ({ column }) => {
  if (!column) {
    return null;
  }
  const cards = column.cards && Array.isArray(column.cards) ? column.cards : [];
  return (
    <div className="column">
      <h3>{column.name}</h3>
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
