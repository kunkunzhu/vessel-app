/** @format */

"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="flex items-center flex-col my-auto">
      <div className="flex flex-col gap-1 mb-4 text-center border-b border-accent pb-4 w-[480px]">
        <div className="font-title text-4xl">Welcome to Vessle.</div>
        <div className="text-sm opacity-75 mb-4">
          To get started, please sign in or sign up:
        </div>
      </div>
      {children}
    </div>
  );
}
