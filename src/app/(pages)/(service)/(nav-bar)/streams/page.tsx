"use client";

import AppBar from "@/components/app-bar";
import FloatingButton from "@/components/floating-button";
import { Stream } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

interface StreamsResponse {
  ok: boolean;
  streams?: Stream[];
}

export default function Streams() {
  const { data } = useSWR<StreamsResponse>("/api/streams");
  return (
    <AppBar title="라이브">
      <div className="divide-y-[1px] space-y-4">
        {data?.streams?.map((stream) => (
          <Link
            key={stream.id}
            href={`/streams/${stream.id}`}
            className="pt-4 block  px-4"
          >
            <div className="w-full relative overflow-hidden rounded-md shadow-sm bg-slate-300 aspect-video">
              <Image
                src={`https://videodelivery.net/${stream.cloudflareId}/thumbnails/thumbnail.jpg?height=320`}
                alt={stream.name}
                fill
              />
            </div>
            <h3 className="text-gray-700 text-lg mt-2">{stream.name}</h3>
          </Link>
        ))}
        <FloatingButton href="/streams/create">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </FloatingButton>
      </div>
    </AppBar>
  );
}
