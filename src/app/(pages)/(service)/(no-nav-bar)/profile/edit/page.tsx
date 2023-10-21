"use client";
import AppBar from "@/components/app-bar";
import Button from "@/components/button";
import Input from "@/components/input";
import useUser from "@/libs/client/useUser";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface EditProfileForm {
  email?: string;
  phone?: string;
  formErrors?: string;
}
export default function EditProfile() {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [setValue, user]);
  const onValid = ({ email, phone }: EditProfileForm) => {
    if (email === "" && phone === "") {
      setError("root.empty", {
        message: "You must provide at least one field",
      });
    } else {
      console.log("update profile");
      // TODO
    }
  };
  return (
    <AppBar title="Edit profile" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:ring-2 hover:ring-offset-2 hover:ring-orange-500 text-gray-700"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("email")}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phone")}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.root?.empty ? (
          <span className="my-2 text-red-500 font-medium block">
            {errors.root.empty.message}
          </span>
        ) : null}
        <Button text="Update profile" />
      </form>
    </AppBar>
  );
}
