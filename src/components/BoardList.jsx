import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import BoardItemList from "./BoardListItem";

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/boards/all/1");
        console.log("Api response data", response.data);
        setBoards(response.data);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching", e);
      }
    };
    fetchBoards();
  }, []);

  if (loading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="flex flex-col justify-start items-center h-screen w-screen font-mono bg-black text-white">
      <h2 className=" text-3xl my-2">My Boards</h2>
      {boards.length === 0 ? (
        <p>No boards found for this user. Try creating one in the backend!</p>
      ) : (
        <ul className="flex flex-row justify-around w-full flex-wrap ">
          {boards.map((board) => (
            <BoardItemList key={board.id} board={board} />
          ))}
        </ul>
      )}
    </div>
  );
};
export default BoardList;
