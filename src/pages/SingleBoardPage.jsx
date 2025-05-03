import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardDetails from "../components/BoardDetails";

const SingleBoardPage = () => {
  const [board, setBoard] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { boardId } = useParams();

  const handleBoardUpdated = (updatedBoardData) => {
    console.log("handleBoardUpdated called from child!", updatedBoardData);
    // This is where we update the state in the parent component
    setBoard(updatedBoardData); // <-- Update the main 'board' state
  };

  useEffect(() => {
    console.log("Use effect runnning for :", boardId);
    const fetchBoard = async () => {
      try {
        setLoading(true);
        setError(null);
        setBoard(null);

        const [boardResponse, cardResponse] = await Promise.all([
          axios.get(`http://localhost:8080/api/boards/${boardId}`),
          axios.get(`http://localhost:8080/api/boards/${boardId}/cards`),
        ]);
        const boardData = boardResponse.data;
        const allCardsData = cardResponse.data;

        console.log("Data Recieved");

        const cardsByColumn = allCardsData.reduce((accumulator, card) => {
          if (!accumulator[card.columnId]) {
            accumulator[card.columnId] = [];
          }
          accumulator[card.columnId].push(card);
          return accumulator;
        }, {});
        console.log("Cards grouped by column:", cardsByColumn);

        const columnsWithNestedCards = boardData.columns.map((column) => {
          const cardsForCurrentColumn = cardsByColumn[column.id] || [];
          return {
            ...column,
            cards: cardsForCurrentColumn,
          };
        });

        const finalStructuredData = {
          ...boardData,
          columns: columnsWithNestedCards,
        };
        console.log(finalStructuredData);
        setBoard(finalStructuredData);
      } catch (e) {
        console.error("Error :", e);
      } finally {
        setLoading(false);
        console.log(`Attempt to fetch data for ${boardId} has ended`);
      }
    };

    if (boardId && !isNaN(boardId)) {
      fetchBoard();
    } else {
      setError("Error: Invalid or missing Board ID in URL.");
      setLoading(false);
    }
  }, [boardId]);

  if (loading) {
    return (
      <>
        <h2>Loading..</h2>
      </>
    );
  }
  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }
  if (!board) {
    return <div>Board data does not exist</div>;
  }

  return (
    <>
      <h2>Board Details</h2>
      <BoardDetails board={board} onBoardUpdated={handleBoardUpdated} />
    </>
  );
};
export default SingleBoardPage;
