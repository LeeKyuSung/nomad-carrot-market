"use client";
import AppBar from "@/components/app-bar";
import Button from "@/components/button";
import Input from "@/components/input";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface EditProfileForm {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: FileList;
}
interface EditProfileResponse {
  ok: boolean;
  error?: string;
}
export default function EditProfile() {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/9XhrxadWkcwKer2x3cW5Dw/${user?.avatar}/avatar`
      );
  }, [setValue, user]);
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>("/api/users/me");
  const onValid = async ({ name, email, phone, avatar }: EditProfileForm) => {
    if (loading) return;
    if (email === "" && phone === "") {
      setError("root.error", {
        message: "You must provide at least one field",
      });
    } else {
      if (avatar && avatar[0]) {
        // ask for Cloudflare url
        const { uploadURL } = await (await fetch(`/api/files`)).json();
        // upload file to CF URL
        const form = new FormData();
        form.append("file", avatar[0], String(user?.id));
        const {
          result: { id },
        } = await (
          await fetch(uploadURL, {
            method: "POST",
            body: form,
          })
        ).json();
        editProfile({ name, email, phone, avatarId: id });
      } else {
        editProfile({ name, email, phone });
      }
    }
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("root.error", { message: data.error });
    }
  }, [data, setError]);
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar[0]) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar, setValue]);
  return (
    <AppBar title="Edit profile" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="w-14 h-14 rounded-full bg-slate-500"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:ring-2 hover:ring-offset-2 hover:ring-orange-500 text-gray-700"
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          label="Name"
          name="name"
          type="name"
        />
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
        {errors.root?.error ? (
          <span className="my-2 text-red-500 font-medium block">
            {errors.root.error.message}
          </span>
        ) : null}
        <Button text={loading ? "Loading..." : "Update profile"} />
      </form>
    </AppBar>
  );
}
