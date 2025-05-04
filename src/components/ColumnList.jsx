import React from "react";
import Column from "./Column";

const ColumnList = ({ columns }) => {
  if (!columns || columns.length === 0) {
    return <div>No columns found</div>;
  }
  return (
    <div className="column-list flex flex-row w-100 gap-5 justify-around overflow-x-auto ">
      {columns.map((column) => (
        <div key={column.id} className="column-element">
          <Column column={column} />
        </div>
      ))}
    </div>
  );
};

export default ColumnList;
