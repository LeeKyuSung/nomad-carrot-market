"use client";

import AppBar from "@/components/app-bar";
import TextArea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import { classNames } from "@/libs/client/utils";
import { Answer, Post } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

interface AnswerWithUser extends Answer {
  user: {
    id: string;
    name: string;
    avatar: string;
  };
}
interface PostWithUser extends Post {
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  Answer: AnswerWithUser[];
  _count: {
    Answer: number;
    Wondering: number;
  };
}
interface CommunityPostResponse {
  ok: boolean;
  post?: PostWithUser;
  isWondering?: boolean;
}

export default function CommunityPostDetail({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { data, mutate, error } = useSWR<CommunityPostResponse>(
    params.id ? `/api/posts/${params.id}` : null
  );
  useEffect(() => {
    if (data?.ok === false) {
      router.replace("/community");
    }
  }, [data, router]);

  const [wonder, { loading }] = useMutation(`/api/posts/${params.id}/wonder`);
  const onWonderClick = () => {
    if (!data || loading) return;
    mutate(
      {
        ...data,
        post: {
          ...data.post!,
          _count: {
            ...data.post!._count,
            Wondering: data.isWondering
              ? data.post!._count.Wondering! - 1
              : data.post!._count.Wondering! + 1,
          },
        },
        isWondering: !data.isWondering,
      },
      false
    );
    wonder({});
  };

  return (
    <AppBar title="제목" canGoBack>
      <div>
        <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          동네질문
        </span>
        <Link
          href={`/users/profiles/${data?.post?.user.id}`}
          className="flex mb-3 px-4 cursor-pointer pb-3  border-b items-center space-x-3"
        >
          <div className="w-10 h-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {data?.post?.user.name}
            </p>
            <p className="text-xs font-medium text-gray-500">
              View profile &rarr;
            </p>
          </div>
        </Link>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="text-orange-500 font-medium">Q.</span> What is the
            {data?.post?.question}
          </div>
          <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
            <button
              onClick={onWonderClick}
              className={classNames(
                "flex space-x-2 items-center text-sm",
                data?.isWondering ? "text-teal-500" : ""
              )}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 {data?.post?._count.Wondering}</span>
            </button>
            <span className="flex space-x-2 items-center text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 {data?.post?._count.Answer}</span>
            </span>
          </div>
        </div>
        <div className="px-4 my-5 space-y-5">
          {data?.post?.Answer.map((answer) => (
            <div key={answer.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full" />
              <div>
                <span className="text-sm block font-medium text-gray-700">
                  {answer.user.name}
                </span>
                <span className="text-xs text-gray-500 block ">
                  {answer.createdAt.toLocaleString()}
                </span>
                <p className="text-gray-700 mt-2">{answer.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4">
          <TextArea
            name="description"
            placeholder="Answer this question!"
            required
          ></TextArea>
          <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
            Reply
          </button>
        </div>
      </div>
    </AppBar>
  );
}
