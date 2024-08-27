import React, { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Api from "@/api/ApiCalls";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CameraIcon } from "lucide-react";

function AddItems() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const client = useQueryClient();
  const { data: { data: allCategory } = "", data = "" } = useQuery({
    queryKey: ["select"],
    queryFn: async () => await Api.getCategory(),
  });
  const [imgUrl, setImgUrl] = useState("");
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
      <div>
        <Outlet />
      </div>
      <form action="/hello" method="post" onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col gap-y-6">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-stone-600 bg-gray-500 text-white">
            <span>
              <input
                type="file"
                className="absolute right-1/2 top-1/2 z-[5] h-6 w-6 -translate-y-1/2 translate-x-1/2 overflow-hidden opacity-0"
                accept="image/*"
                {...register("image")}
                onInput={(e) => setImgUrl(e.target.files)}
              />
              <CameraIcon className="absolute right-1/2 top-1/2 z-[1] -translate-y-1/2 translate-x-1/2" />
            </span>
            <span className="absolute z-[0] h-full w-full">
              <img
                src={imgUrl[0] && URL.createObjectURL(imgUrl[0])}
                alt=""
                className="h-full w-full rounded-full object-cover"
              />
            </span>
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
                <option disabled>Select category</option>
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
                onClick={() => {
                  navigate("/category");
                }}
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
