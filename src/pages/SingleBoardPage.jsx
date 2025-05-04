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
    setBoard(updatedBoardData);
  };

  useEffect(() => {
    console.log("Use effect runnning for :", boardId);
    const fetchBoard = async () => {
      try {
        setLoading(true);
        setError(null);
        setBoard(null);

        const [boardResponse, cardResponse] = await Promise.all([
          axios.get(`/api/boards/${boardId}`),
          axios.get(`/api/boards/${boardId}/cards`),
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
    <div className="bg-black flex flex-col items-center justify-start w-screen h-screen text-white font-mono">
      <h2 className="my-3 text-3xl underline ">Board Details</h2>
      <BoardDetails board={board} onBoardUpdated={handleBoardUpdated} />
    </div>
  );
};
export default SingleBoardPage;
