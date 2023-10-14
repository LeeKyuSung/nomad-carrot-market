"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setUser(data.profile);
        } else {
          return router.replace("/enter");
        }
      });
  }, [router]);
  return user;
}
