"use client";

import { classNames } from "@/libs/client/utils";
import { useRouter } from "next/navigation";

export default function AppBar({
  title,
  canGoBack,
  children,
}: {
  title?: string;
  canGoBack?: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  return (
    <div>
      <div className="bg-white w-full h-12 max-w-xl justify-center text-lg px-10 font-medium  fixed text-gray-800 border-b top-0  flex items-center">
        {canGoBack ? (
          <button onClick={onClick} className="absolute left-4">
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
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        ) : null}
        {title ? (
          <span className={classNames(canGoBack ? "mx-auto" : "", "")}>
            {title}
          </span>
        ) : null}
      </div>
      <div className={classNames("pt-12")}>{children}</div>
    </div>
  );
}
