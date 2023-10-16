"use client";
import useUser from "@/libs/client/useUser";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser();
  return <>{children}</>;
}
