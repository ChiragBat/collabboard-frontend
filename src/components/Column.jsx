import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";

const Column = ({
  column,
  boardId,
  onDelete,
  onCardCreated,
  onCardDeleted,
}) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardContent, setCardContent] = useState("");

  const handleDeleteColumn = (event) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete(column.id);
    }
  };

  if (!column) {
    return null;
  }

  const handleAddCardClick = () => {
    setIsAddingCard(true);
  };

  const handleCardContentChange = (event) => {
    setCardContent(event.target.value);
  };

  const handleCancelNewCard = () => {
    setIsAddingCard(false);
    setCardContent("");
  };

  const handleTextareaKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const trimmedContent = cardContent.trim();
      if (trimmedContent) {
        try {
          console.log(
            `Simulating API call to /api/boards/${boardId}/cards with content: ${trimmedContent} and columnId: ${column.id}`
          );
          const response = await axios.post(`/api/boards/${boardId}/cards`, {
            content: trimmedContent,
            columnId: column.id,
          });

          if (onCardCreated) {
            onCardCreated(response.data, column.id);
          }
          handleCancelNewCard();
        } catch (error) {
          console.error(
            "Failed to create card:",
            error.response?.data || error.message || error
          );
          alert("Failed to create card. Please check console or try again.");
        }
      } else {
        handleCancelNewCard();
      }
    } else if (event.key === "Escape") {
      handleCancelNewCard();
    }
  };

  const cards = column.cards && Array.isArray(column.cards) ? column.cards : [];
  return (
    <div className="column bg-[#670D2F] p-2 rounded-xl relative flex flex-col items-center gap-2">
      <div className="w-full flex justify-between items-start mb-2 px-1">
        <h3 className="underline text-lg font-semibold break-words mr-2">
          {column.name}
        </h3>
        <div className="flex flex-row gap-1 items-center flex-shrink-0">
          <div
            className="cursor-pointer p-1 hover:bg-pink-700 rounded"
            onClick={handleDeleteColumn}
            title="Delete column"
          >
            🗑️
          </div>
          <div
            className="cursor-pointer p-1 hover:bg-pink-700 rounded text-xl font-bold"
            onClick={handleAddCardClick}
            title="Add new card"
          >
            {!isAddingCard && `+`}
          </div>
        </div>
      </div>
      <div className="card-list flex flex-col gap-2 w-full">
        {cards.length === 0 ? (
          <p>No cards yet</p>
        ) : (
          cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              boardId={boardId}
              onCardDeleted={onCardDeleted}
            />
          ))
        )}
        {isAddingCard && (
          <div className="w-full mt-1">
            <textarea
              className="w-full p-2 rounded-md bg-gray-200 text-black border border-gray-400 focus:border-pink-500 focus:ring-pink-500"
              value={cardContent}
              onChange={handleCardContentChange}
              onKeyDown={handleTextareaKeyDown}
              onBlur={handleCancelNewCard}
              placeholder="Enter Card Content"
              rows="3"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Column;
