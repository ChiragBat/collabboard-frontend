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
        const response = await axios.get(
          "http://localhost:8080/api/boards/all/1"
        );
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
    <>
      <h2>My Boards</h2>
      {boards.length === 0 ? (
        <p>No boards found for this user. Try creating one in the backend!</p>
      ) : (
        <ul>
          {boards.map((board) => (
            <BoardItemList key={board.id} board={board} />
          ))}
        </ul>
      )}
    </>
  );
};
export default BoardList;
