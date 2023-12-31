"use client";

import AppBar from "@/components/app-bar";
import Button from "@/components/button";
import Input from "@/components/input";
import TextArea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import { Stream } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreateForm {
  name: string;
  price: string;
  description: string;
}
interface CreateResponse {
  ok: boolean;
  stream: Stream;
}

export default function Create() {
  const router = useRouter();
  const [createStream, { loading, data }] =
    useMutation<CreateResponse>("/api/streams");
  const { register, handleSubmit } = useForm<CreateForm>();
  const onValid = (form: CreateForm) => {
    if (loading) return;
    createStream(form);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.replace(`/streams/${data.stream.id}`);
    }
  }, [data, router]);
  return (
    <AppBar title="라이브 시작하기" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 p-4">
        <Input
          register={register("name", { required: true })}
          required
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          required
          label="Price"
          name="price"
          type="number"
          kind="price"
        />
        <TextArea
          register={register("description", { required: true })}
          name="description"
          label="Description"
        />
        <Button text="Go live" />
      </form>
    </AppBar>
  );
}
