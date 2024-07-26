import React from "react";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Api from "@/api/ApiCalls";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function AddItems() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const client = useQueryClient();
  const { data: { data: allCategory } = "", data = "" } = useQuery({
    queryKey: ["select"],
    queryFn: async () => await Api.getCategory(),
  });
  const clearInputs = () => {
    setValue("image", "");
    setValue("name", "");
    setValue("description", "");
    setValue("category", "");
    setValue("price", "");
  };
  const formMutation = useMutation({
    mutationKey: ["food"],
    mutationFn: async (data) => {
      return await Api.addFood(data);
    },
    onSuccess: (result) => {
      console.log(result);
      toast.success(result?.message);
      clearInputs();
      client.invalidateQueries({ queryKey: ["fetchFood"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const submitForm = (data) => {
    formMutation.mutate(data);
  };
  return (
    <div className="w-[500px] rounded-xl px-8 py-6">
      <form action="/hello" method="post" onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col gap-y-6">
          <div>
            <input type="file" accept="image/*" {...register("image")} />
          </div>
          <Input
            label="Product name"
            placeholder="Enter name"
            {...register("name")}
          />
          <textarea
            name="text"
            placeholder="Product description"
            className="h-36 w-full resize-none rounded-md border border-black px-2 py-1.5 outline-none"
            {...register("description")}
          ></textarea>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="label" className="text-lg">
                Product category
              </label>
              <select
                className="rounded-md border border-black px-3 py-2 outline-none"
                {...register("category")}
              >
                <option value="" disabled selected>
                  Select category
                </option>
                {allCategory?.length > 0 &&
                  allCategory.map(({ category, _id }) => {
                    return (
                      <option value={_id} key={_id && _id}>
                        {category && category}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <Button
                type="button"
                onClick={() => navigate("/category")}
                className="cat-box"
              >
                Add category
              </Button>
            </div>
          </div>
          <Input
            label="Enter price"
            type="Number"
            placeholder="Price"
            {...register("price")}
          />
          <div className="flex justify-end">
            <Button className="w-fit px-12" type="submit">
              ADD
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddItems;
