import Api from "@/api/ApiCalls";
import { ProductCard } from "@/components";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

function ListItems() {
  const {
    data,
    isError,
    isLoading,
    data: { docs } = "",
  } = useQuery({
    queryKey: ["fetchFood"],
    queryFn: async () => Api.getFood(),
  });
  useEffect(() => {
    console.log(docs);
  }, [docs]);
  return (
    <div className="grid h-full grid-cols-4 gap-x-11">
      {isLoading ? (
        <div>Loading....</div>
      ) : Array.isArray(docs) && docs.length > 0 ? (
        docs.map((items, index) => (
          <ProductCard
            key={index}
            name={items.name}
            price={items.price}
            category={items.category}
            image={items?.image}
          />
        ))
      ) : (
        <div className="col-span-full row-span-full flex w-full items-center justify-center text-5xl font-semibold">
          <p>No Food Available</p>
        </div>
      )}
    </div>
  );
}

export default ListItems;
