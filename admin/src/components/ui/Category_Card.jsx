import React, { useRef, useState, useEffect } from "react";
import { Delete, Edit, Save } from "../../assets/icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "@/api/ApiCalls";
import { toast } from "sonner";
import Confirm_Delete from "./Confirm_Delete";

function Category_Card({ id, category }) {
  const [input, setInput] = useState(category);
  const [isWritable, setIsWritable] = useState(true);
  const [initialAni, setInitialAni] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [isShowDelete, setShowDelete] = useState(false);
  const client = useQueryClient();

  const save = useRef(null);
  const edit = useRef(null);
  useGSAP(() => {
    if (initialAni) {
      if (isWritable) {
        gsap.to(save.current, {
          scale: 0,
          duration: 0.1,
          onComplete: () => {
            gsap.to(edit.current, {
              scale: 1,
              duration: 0.2,
            });
          },
        });
      } else {
        gsap.to(edit.current, {
          scale: 0,
          duration: 0.1,
          onComplete: () => {
            gsap.to(save.current, {
              scale: 1,
              duration: 0.2,
            });
          },
        });
      }
    }
  }, [isWritable]);

  const updateCategoryMutation = useMutation({
    mutationKey: ["changeCat"],
    mutationFn: async () => {
      await Api.updateCategory(id, input);
    },
    onSuccess: () => {
      toast.success("Category is updated successfully");
      client.invalidateQueries({ queryKey: ["cat"] });
    },
    onError: (err) => {
      // toast.error(err);
    },
  });
  const deleteCategoryMutation = useMutation({
    mutationKey: ["detcat"],
    mutationFn: async () => await Api.deleteCategory(id),
    onSuccess: () => {
      toast.success(`${category} is deleted successfully`);
      client.invalidateQueries("cat");
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  useEffect(() => {
    if (initialAni) {
      if (isWritable) {
        if (input === category || !input.trim()) return;
        updateCategoryMutation.mutate();
      }
    }
  }, [isWritable]);

  useEffect(() => {
    if (isDelete) {
      deleteCategoryMutation.mutate();
    }
  }, [isDelete]);
  return (
    <>
      <td className="cat-box w-16 rounded-l-md border-y border-l border-black p-2.5">
        <div className="absolute top-1/2 z-50 -translate-y-1/2">
          {isShowDelete && (
            <Confirm_Delete
              setDelete={setDelete}
              setShowDelete={setShowDelete}
            />
          )}
        </div>
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
          value={input}
          placeholder="Enter text here"
          disabled={isWritable}
          className="cat-box w-full px-3 py-2.5 outline-none"
          onChange={(e) => setInput(e.target.value)}
        />
      </td>
      <td className="cat-box w-24 rounded-r-md border-y border-r border-black p-2.5">
        <div className="cat-box flex items-center justify-center gap-x-4">
          <button
            className="cat-box relative h-[22px] w-[22px] rounded p-1 hover:bg-gray-100"
            onClick={() => {
              setInitialAni(true);
              setIsWritable((prev) => !prev);
            }}
          >
            <Edit
              className="cat-box absolute top-[50%] -translate-y-[45%]"
              height="22px"
              width="22px"
              ref={edit}
            />
            <Save
              className="cat-box absolute top-[50%] -translate-y-[45%] scale-0"
              height="22px"
              width="22px"
              ref={save}
            />
          </button>
          <button
            className="cat-box rounded p-1 hover:bg-gray-100"
            onClick={() => setShowDelete(true)}
          >
            <Delete className="cat-box" height="22px" width="22px" />
          </button>
        </div>
      </td>
    </>
  );
}

export default Category_Card;
