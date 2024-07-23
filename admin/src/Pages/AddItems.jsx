import React from "react";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Api from "@/api/ApiCalls";

function AddItems() {
  const navigate = useNavigate();
  const { data: { data: allCategory } = "", data = "" } = useQuery({
    queryKey: ["select"],
    queryFn: async () => await Api.getCategory(),
  });
  const handleSubmit = () => {
    alert("Form is submitted");
  };
  return (
    <div className="w-[500px] rounded-xl px-8 py-6">
      <form action="/hello" method="post" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-6">
          <div>
            <input type="file" accept="" />
          </div>
          <Input label="Product name" placeholder="Enter name" />
          <textarea
            name="text"
            placeholder="Product description"
            className="h-36 w-full resize-none rounded-md border border-black px-2 py-1.5 outline-none"
          ></textarea>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="label" className="text-lg">
                Product category
              </label>
              <select className="rounded-md border border-black px-3 py-2 outline-none">
                {allCategory?.length > 0 &&
                  allCategory.map(({ category, _id }) => {
                    console.log(category);
                    return (
                      <option value="name" key={_id && _id}>
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
          <Input label="Enter price" type="Number" placeholder="Price" />
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
