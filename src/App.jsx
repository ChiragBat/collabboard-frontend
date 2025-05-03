import { useState } from "react";
import "./App.css";
import BoardList from "./components/BoardList";
import { Route, Routes } from "react-router-dom";
import SingleBoardPage from "./pages/SingleBoardPage";

const SingleBoardPlaceholder = () => {
  return <div>Loading Single Board View...</div>;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/board/:boardId" element={<SingleBoardPage />} />
      </Routes>
    </>
  );
}

export default App;
