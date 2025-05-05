import React, { useState } from "react";

const CreateColumnModal = ({ isOpen, onClose, onSubmit }) => {
  const [columnName, setColumnName] = useState("");

  if (!isOpen) {
    return null;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(columnName);
    }
    setColumnName;
  };
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setColumnName("");
  };
  return (
    <div className="flex flex-col items-center">
      <h3>Create New Column</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
          className="border-pink-700"
        />
        <div className="flex flex-row w-full justify-between mt-3">
          <button onClick={handleClose} className="bg-[#670D2F] rounded-md p-2">
            Cancel
          </button>
          <button type="submit" className="bg-[#670D2F] rounded-md p-2">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateColumnModal;
