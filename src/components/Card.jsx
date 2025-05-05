import React from "react";

const Card = ({ card }) => {
  if (!card) {
  }
  return (
    <div className="card bg-pink-600 rounded-md p-2 block">
      <p>{card.content}</p>
    </div>
  );
};
export default Card;
