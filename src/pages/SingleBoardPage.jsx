import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardDetails from "../components/BoardDetails";
import ColumnList from "../components/ColumnList";
import CreateColumn from "../components/CreateColumnModal";

const SingleBoardPage = () => {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { boardId } = useParams();

  const [isCreateColumnOpen, setIsCreateColumnOpen] = useState(false);

  const handleCloseCreateColumn = () => {
    setIsCreateColumnOpen(false);
  };
  const handleOpenCreateColumn = () => {
    setIsCreateColumnOpen(true);
  };
  const handleCreateColumnSubmit = async (columnName) => {
    const currentBoardId = boardId;
    const payload = {
      name: columnName,
    };
    try {
      const response = await axios.post(
        `/api/boards/${currentBoardId}/columns`,
        payload
      );
      const newColumn = response.data;

      setBoard((prevBoard) => {
        if (!prevBoard) {
          return {
            id: currentBoardId,
            name: "Board",
            description: "",
            columns: [newColumn],
          };
        }
        const existingColumns = Array.isArray(prevBoard.columns)
          ? prevBoard.columns
          : [];
        return {
          ...prevBoard,
          columns: [...existingColumns, newColumn],
        };
      });
    } catch (error) {
      console.error(
        "Failed to create Column:",
        error.response?.data || error.message || error
      );
      alert("Failed to create Column");
    }
  };

  const handleBoardUpdated = (updatedBoardData) => {
    console.log("handleBoardUpdated called from child!", updatedBoardData);
    setBoard(updatedBoardData);
  };
  const handleDelete = (columnId) => {
    setBoard((prevBoard) => {
      const updatedBoard = { ...prevBoard };
      updatedBoard.columns = updatedBoard.columns.filter(
        (column) => column.id !== columnId
      );
      return updatedBoard;
    });
  };

  const handleCardCreated = (newCard, targetColumnId) => {
    setBoard((prevBoard) => {
      if (!prevBoard || !prevBoard.columns) {
        console.error(
          "Cannot create card: board or columns data is missing.",
          prevBoard
        );
        return prevBoard;
      }
      const updatedColumns = prevBoard.columns.map((column) => {
        if (column.id === targetColumnId) {
          // Ensure cards array exists and is an array before spreading
          const existingCards = Array.isArray(column.cards) ? column.cards : [];
          return {
            ...column,
            cards: [...existingCards, newCard],
          };
        }
        return column;
      });
      return {
        ...prevBoard,
        columns: updatedColumns,
      };
    });
  };

  const handleCardDeleted = (deletedCardId, targetColumnId) => {
    setBoard((prevBoard) => {
      if (!prevBoard || !prevBoard.columns) {
        console.error(
          "Cannot delete card: board or columns data is missing.",
          prevBoard
        );
        return prevBoard;
      }
      const updatedColumns = prevBoard.columns.map((column) => {
        if (column.id === targetColumnId) {
          const updatedCards = (column.cards || []).filter(
            (card) => card.id !== deletedCardId
          );
          return {
            ...column,
            cards: updatedCards,
          };
        }
        return column;
      });
      return {
        ...prevBoard,
        columns: updatedColumns,
      };
    });
  };

  useEffect(() => {
    console.log("Use effect runnning for :", boardId);
    const fetchBoard = async () => {
      try {
        setLoading(true);
        setError(null);

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
    return <div>Board data does not exist or is loading...</div>;
  }

  return (
    <div className="bg-black flex flex-col items-center justify-start w-screen h-screen text-white font-mono">
      <div className="flex justify-between items-center w-full px-8 py-4">
        <h2 className="text-3xl underline">Board Details</h2>
        {!isCreateColumnOpen && (
          <button
            onClick={handleOpenCreateColumn}
            className="bg-white text-black px-4 py-2 rounded-md font-bold hover:bg-gray-300"
          >
            + Add Column
          </button>
        )}
        <CreateColumn
          isOpen={isCreateColumnOpen}
          onClose={handleCloseCreateColumn}
          onSubmit={handleCreateColumnSubmit}
        />
      </div>
      <BoardDetails
        board={board}
        onBoardUpdated={handleBoardUpdated}
        onColumnDeleted={handleDelete}
      />
      <ColumnList
        columns={board.columns}
        boardId={boardId}
        onColumnDeleted={handleDelete}
        onCardCreated={handleCardCreated}
        onCardDeleted={handleCardDeleted}
      />
    </div>
  );
};
export default SingleBoardPage;
