import { Delete } from "@/assets/icons";
import React from "react";

function ProductCard({ image, price, category, name }) {
  console.log(image);
  return (
    <div className="relative h-[380px] w-full overflow-hidden rounded-xl border border-gray-800 bg-red-200 p-2.5 shadow-2xl transition-all hover:-translate-y-1">
      <div className="fixed right-2.5">
        <button>
          <Delete />
        </button>
      </div>
      <div className="h-[200px] w-full overflow-hidden rounded-xl">
        <img
          src={`http://localhost:8000/api/v1/images/${image}`}
          className="h-full w-full object-cover"
        />
      </div>
      <div
        style={{ height: "calc(100% - 200px)" }}
        className="flex flex-col justify-between pt-4"
      >
        <div className="flex w-full justify-between">
          <p className="flex-1 text-start text-3xl font-semibold">{name}</p>
          <p className="flex-1 text-end text-xl">{category?.category}</p>
        </div>
        <div className="flex w-full justify-end">
          <input
            type="text"
            disabled
            value={price}
            className="h-10 w-[100px] rounded-md border border-black px-2 py-2 outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
