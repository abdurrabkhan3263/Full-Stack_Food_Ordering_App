import React, { useEffect, useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import Input from "./ui/Input";
import { Button } from "./ui/button";
import { AddCategory } from ".";
import Api from "@/api/ApiCalls";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { CameraIcon } from "lucide-react";

function EditProductForm() {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [allCategory, setAllCategory] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await Api.getCategory();
      setAllCategory(response);
    })();
  }, []);

  const submitForm = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const classes = Array.from(e.target.classList);
      if (classes.includes("mainContainer")) {
        navigate(-1);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const {
        image = "",
        name = "",
        description = "",
        price = "",
        category = {},
      } = await Api.getFoodById(id);
      setValue("name", name);
      setValue("description", description);
      setValue("price", price);
      setValue("category", category?._id);
      setImgUrl(image);
    })();
  }, [id]);

  return (
    <div className="mainContainer flex h-screen w-screen items-center justify-center bg-[#0000003d]">
      <div className="max-h-[750px] w-[500px] overflow-y-auto rounded-2xl bg-white px-8 py-6 shadow-xl">
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
                  src={
                    imgUrl instanceof FileList && imgUrl.length > 0
                      ? URL.createObjectURL(imgUrl[0])
                      : `http://localhost:8000/api/v1/images/${imgUrl}`
                  }
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
                        <option
                          value={_id}
                          key={_id}
                          selected={_id === getValues("category")}
                        >
                          {category}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div>
                <Button
                  type="button"
                  onClick={() => {
                    navigate("add-category");
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
    </div>
  );
}

export default EditProductForm;
