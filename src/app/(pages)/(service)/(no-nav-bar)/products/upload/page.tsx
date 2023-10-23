"use client";

import AppBar from "@/components/app-bar";
import Button from "@/components/button";
import Input from "@/components/input";
import TextArea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
  photo: FileList;
}
interface UploadProductMutation {
  ok: boolean;
  product: Product;
}
export default function Upload() {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<UploadProductForm>();
  const [uploadProduct, { loading, data }] =
    useMutation<UploadProductMutation>("/api/products");
  const onValid = async ({
    name,
    price,
    description,
    photo,
  }: UploadProductForm) => {
    if (loading) return;
    if (photo && photo[0]) {
      const { uploadURL } = await (await fetch("/api/files")).json();
      const formData = new FormData();
      formData.append("file", photo[0], name);
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: formData,
        })
      ).json();
      uploadProduct({ name, price, description, photoId: id });
    } else {
      uploadProduct({ name, price, description });
    }
  };
  useEffect(() => {
    if (data?.ok) {
      alert("Product uploaded");
      router.push(`/products/${data.product.id}`);
    }
  });
  const photo = watch("photo");
  const [photoPreview, setPhotoPreview] = useState("");
  useEffect(() => {
    if (photo && photo[0]) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photo]);

  return (
    <AppBar canGoBack title="Upload Product">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div>
          {photoPreview ? (
            <img
              src={photoPreview}
              className="w-full text-gray-600 h-46 rounded-md"
            />
          ) : (
            <label className="w-full cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md text-gray-600 hover:text-orange-500 hover:border-orange-500">
              <svg
                className="h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <input
                {...register("photo")}
                accept="image/*"
                type="file"
                className="hidden"
              />
            </label>
          )}
        </div>
        <Input
          register={register("name", { required: true })}
          required
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("price", { required: true })}
          required
          label="Price"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea
          register={register("description", { required: true })}
          name="description"
          label="Description"
          required
        />
        <Button text={loading ? "Loaidng..." : "Upload Product"} />
      </form>
    </AppBar>
  );
}
