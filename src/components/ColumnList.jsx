import React from "react";
import Column from "./Column";

const ColumnList = ({ columns }) => {
  if (!columns || columns.length === 0) {
    return <div>No columns found</div>;
  }
  return (
    <div className="column-list">
      {columns.map((column) => (
        <div
          key={column.id}
          className="column-element"
          style={{
            flexShrink: 0,
            width: "300px",
            backgroundColor: "#f0f0f0",
            padding: "12px",
            borderRadius: "4px",
          }}
        >
          <Column key={column.id} column={column} />
          <p>cards</p>
        </div>
      ))}
    </div>
  );
};

export default ColumnList;
