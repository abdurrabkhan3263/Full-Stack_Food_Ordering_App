import React, { useEffect, useRef, useState } from "react";
import Api from "@/api/ApiCalls";
import { Delete } from "@/assets/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Confirm_Delete from "./ui/Confirm_Delete";
import { PenLineIcon } from "lucide-react";
import EditProductForm from "./EditProductForm";
import { Outlet, useNavigate } from "react-router-dom";

function ProductCard({ id, image, price, category, name }) {
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();
  const client = useQueryClient();
  const deleteProductMutation = useMutation({
    mutationKey: ["proDel"],
    mutationFn: async () => await Api.deleteFood(id),
    onSuccess: (data) => {
      toast.success(data);
      client.invalidateQueries({ queryKey: ["fetchFood"] });
      setIsShowDelete(false);
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  useEffect(() => {
    if (isDelete) {
      if (!id) return;
      deleteProductMutation.mutate();
    }
  }, [isDelete]);

  return (
    <>
      <div className="fixed right-[40%] top-[45%] z-50 translate-x-1/2">
        {isShowDelete && (
          <Confirm_Delete
            setDelete={setIsDelete}
            setShowDelete={setIsShowDelete}
          />
        )}
      </div>
      <div className="fixed right-1/2 top-1/2 z-50 -translate-y-1/2 translate-x-1/2">
        <Outlet />
      </div>
      <div className="relative h-[380px] w-full overflow-hidden rounded-xl bg-yellow-300 p-3 text-stone-800 shadow-xl transition-all hover:-translate-y-0.5">
        <div className="absolute right-1/2 flex w-full translate-x-1/2 justify-between px-3">
          <button
            className="rounded-full bg-stone-800 p-2 transition-all hover:bg-stone-300"
            onClick={() => navigate(`edit-product/${id}`)}
          >
            <PenLineIcon
              width={"28px"}
              height={"28px"}
              className="text-white"
            />
          </button>
          <button
            className="rounded-full bg-stone-800 p-2 transition-all hover:bg-stone-300"
            onClick={() => setIsShowDelete(true)}
          >
            <Delete width={"28px"} height={"28px"} className="text-white" />
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
            <p className="flex-1 text-start text-2xl font-semibold">{name}</p>
            <p className="flex-1 text-end text-xl">{category?.category}</p>
          </div>
          <div className="flex w-full justify-end">
            <input
              type="text"
              disabled
              value={price}
              className="h-10 w-[100px] rounded-md border border-gray-300 bg-white px-2 py-2 outline-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
