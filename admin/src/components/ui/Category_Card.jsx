import React from "react";
import { Delete, Edit } from "../../assets/icons";

function Category_Card() {
  return (
    <tr className="w-full">
      <td className="cat-box w-16 rounded-l-md border-y border-l border-black p-2.5">
        <div className="cat-box mx-auto flex h-6 w-6 items-center justify-center">
          <input
            type="checkbox"
            name="delete"
            id="delete"
            className="cat-box h-5 w-5 cursor-pointer"
          />
        </div>
      </td>
      <td className="cat-box border-y border-black">
        <input
          placeholder="Enter text here"
          className="cat-box w-full px-3 py-2.5 outline-none"
        />
      </td>
      <td className="cat-box w-24 rounded-r-md border-y border-r border-black p-2.5">
        <div className="cat-box flex items-center justify-center gap-x-4">
          <button className="cat-box rounded p-1 hover:bg-gray-100">
            <Edit className="cat-box" height="22px" width="22px" />
          </button>
          <button className="cat-box rounded p-1 hover:bg-gray-100">
            <Delete className="cat-box" height="22px" width="22px" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Category_Card;
