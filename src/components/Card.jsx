import React from "react";
import axios from "axios";

const Card = ({ card, boardId, onCardDeleted }) => {
  if (!card) {
    return null;
  }

  const handleDeleteCard = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`/api/boards/${boardId}/cards/${card.id}`);
        if (onCardDeleted) {
          onCardDeleted(card.id, card.columnId);
        }
      } catch (error) {
        console.error(
          "Failed to delete card:",
          error.response?.data || error.message || error
        );
        alert("Failed to delete card. Please check console or try again.");
      }
    }
  };

  return (
    <div className="card bg-pink-600 rounded-md p-2 block">
      <div className="flex justify-between items-center">
        <p className="flex-grow">{card.content}</p>
        <div
          className="cursor-pointer text-red-500 hover:text-red-700 ml-2"
          onClick={handleDeleteCard}
          title="Delete card"
        >
          🗑️
        </div>
      </div>
    </div>
  );
};

export default Card;
