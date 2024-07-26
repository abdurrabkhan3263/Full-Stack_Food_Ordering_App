import React, { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "../assets/icons";
import Category_Card from "@/components/ui/Category_Card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Api from "@/api/ApiCalls";
import Confirm_Delete from "./ui/Confirm_Delete";

function AddCategory() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const client = useQueryClient();

  const {
    data: { data: categoryData } = "",
    isError,
    isLoading,
    data,
  } = useQuery({
    queryKey: ["cat"],
    queryFn: async () => await Api.getCategory(),
  });
  const backCat = useCallback(
    (e) => {
      const classes = Array.from(e.target.classList);
      const isBox = classes.includes("cat-box");
      if (!isBox) {
        navigate("/");
      }
    },
    [navigate],
  );
  useEffect(() => {
    document.addEventListener("click", backCat);
    return () => {
      document.removeEventListener("click", backCat);
    };
  }, [backCat]);
  const addCatMutate = useMutation({
    mutationKey: ["cat"],
    mutationFn: async (inputData) => {
      return Api.createCategory(inputData);
    },
    onSuccess: (result) => {
      console.log(result);
      toast.success(`${input} has been created`);
      setInput("");
      client.invalidateQueries({ queryKey: ["cat"] });
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });
  const handleSubmit = () => {
    if (!input.trim()) {
      return toast.warning("Category is required");
    }
    addCatMutate.mutate(input);
  };

  return (
    <div className="fixed right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[#0000003d]">
      <div className="cat-box relative flex h-[70%] w-[29%] flex-col rounded-2xl border border-black bg-white p-4 shadow-lg">
        <div className="cat-box flex h-fit items-center justify-between gap-x-5">
          <input
            id="cat-box"
            className="cat-box flex-1 rounded-md border border-black px-3 py-2 outline-none focus:border-none focus:ring"
            placeholder="Enter Category"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="cat-box rounded-md bg-black px-10 py-2 font-semibold text-white"
            id="cat-box"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
        <div className="h-4 w-full"></div>
        <div className="cat-box flex-1 overflow-y-auto">
          <table className="cat-box w-full border-separate border-spacing-y-4">
            <thead className="sticky top-0">
              <tr>
                <th className="cat-box rounded-l-lg bg-blue-400 py-2.5 text-white">
                  Select
                </th>
                <th className="cat-box bg-blue-400 py-2.5 text-white">Name</th>
                <th className="cat-box rounded-r-lg bg-blue-400 py-2.5 text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="b">
              {isLoading ? (
                <tr>
                  <td>Loading...</td>
                </tr>
              ) : Array.isArray(categoryData) && categoryData.length > 0 ? (
                categoryData.map(({ _id, category }, index) => (
                  <tr className="w-full" key={_id}>
                    <Category_Card category={category} id={_id} />
                  </tr>
                ))
              ) : (
                "No Data Found"
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
