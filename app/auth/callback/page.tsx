"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      router.push("/");
    } else {
      router.push("/auth/login");
    }
  }, [token, router]);

  return <div>Connexion en cours...</div>;
} 