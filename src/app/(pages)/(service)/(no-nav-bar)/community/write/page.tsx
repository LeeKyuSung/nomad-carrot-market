"use client";

import AppBar from "@/components/app-bar";
import Button from "@/components/button";
import TextArea from "@/components/textarea";
import useCoords from "@/libs/client/useCoords";
import useMutation from "@/libs/client/useMutation";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface WriteForm {
  question: string;
  latitude: number;
  longitude: number;
}
interface WriteResponse {
  ok: boolean;
  post: Post;
}

export default function Write() {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] = useMutation<WriteResponse>("/api/posts");
  const onValid = (data: WriteForm) => {
    if (loading) return;
    post({ ...data, latitude, longitude });
  };
  useEffect(() => {
    if (data?.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <AppBar title="동네생활 글쓰기" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="px-4">
        <TextArea
          register={register("question", { required: true, minLength: 5 })}
          required
          placeholder="Ask a question!"
        />
        <Button text={loading ? "Loading..." : "Submit"} />
      </form>
    </AppBar>
  );
}
