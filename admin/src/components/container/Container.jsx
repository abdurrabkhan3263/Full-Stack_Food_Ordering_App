import React from "react";

function Container({ children }) {
  return (
    <div className="col-start-4 col-end-[16] row-start-2 row-end-[15] bg-green-500">
      {children}
    </div>
  );
}

export default Container;
