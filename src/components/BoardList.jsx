import React, { useState, useEffect } from "react";
import axios from "axios";
import BoardItemList from "./BoardListItem";

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardDescription, setNewBoardDescription] = useState("");

  const handleDeleteBoard = async (boardIdToDelete) => {
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
      try {
        await axios.delete(`/api/boards/${boardIdToDelete}`);
        const updatedBoards = boards.filter(
          (board) => board.id !== boardIdToDelete
        );
        setBoards(updatedBoards);
      } catch {
        alert("Failed to delete board.");
      }
    }
  };

  const handleCreateBoard = () => {
    setIsCreatingBoard(!isCreatingBoard);
    if (!isCreatingBoard) {
      setNewBoardName("");
      setNewBoardDescription("");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const userId = 1;
    const payload = {
      name: newBoardName,
      description: newBoardDescription,
    };
    try {
      const response = await axios.post(`/api/boards/${userId}`, payload);
      setBoards([...boards, response.data]);
      setIsCreatingBoard(false);
      setNewBoardName("");
      setNewBoardDescription("");
    } catch {
      alert("Fail");
    }
  };

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/boards/all/1");
        console.log("API response data:", response.data);
        setBoards(response.data);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching boards:", e);
        setError("Failed to load boards");
        setLoading(false);
      }
    };
    fetchBoards();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col justify-start items-center h-screen w-screen font-mono bg-black text-white">
      <div className="relative w-full px-4 my-2">
        <h2 className="text-3xl text-center">My Boards</h2>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <button
            onClick={handleCreateBoard}
            className="bg-[#670D2F] p-2 rounded-md text-1xl"
          >
            Create Board
          </button>
        </div>
      </div>

      {isCreatingBoard && (
        <div className="w-full px-4 max-w-md text-left">
          <h3 className="text-xl mb-2">Create New Board</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col gap-2"
          >
            <input
              type="text"
              placeholder="Board Name"
              className="p-2 rounded bg-pink-400 text-black"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
            />
            <textarea
              placeholder="Board Description"
              className="p-2 rounded bg-pink-400 text-black"
              value={newBoardDescription}
              onChange={(e) => setNewBoardDescription(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#670D2F] p-2 rounded text-white cursor-pointer"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {boards.length === 0 ? (
        <p>No boards found for this user. Try creating one!</p>
      ) : (
        <ul className="flex flex-row justify-around w-full flex-wrap">
          {boards.map((board) => (
            <BoardItemList
              key={board.id}
              board={board}
              onDelete={handleDeleteBoard}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default BoardList;
