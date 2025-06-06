/** @format */

"use client";
import React, { useState } from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { Input } from "@/components/form/Input";
import { IoIosMail } from "react-icons/io";
import { FaKey } from "react-icons/fa";
import { Button } from "@/components/form/Button";
import Link from "next/link";

function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleForm = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      const errorMsg = "No email or password provided";
      return setError(errorMsg);
    }

    const { result, error } = await signIn(email, password);

    if (error) {
      return setError("Please double check your email and password! ᴖ̈");
    }

    // else successful
    console.log(result);
    return router.push("/");
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleForm} className="flex flex-col  gap-2 w-[320px]">
        <label
          htmlFor="email"
          className="flex items-center font-title justify-between gap-4"
        >
          <p className="font-title">Email</p>
          <Input
            icon={<IoIosMail className="2xl text-secondary" />}
            setInput={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
            placeholder="example@mail.com"
            className="min-w-[220px] text-secondary"
          />
        </label>
        <label
          htmlFor="email"
          className="flex items-center font-title justify-between gap-4"
        >
          <p className="font-title">Password</p>
          <Input
            icon={<FaKey className="2xl text-secondary" />}
            setInput={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="12345"
            className="min-w-[220px]"
          />
        </label>
        <div className="text-xs mb-4">
          <div className="opacity-75 ">
            Don&apos;t have an account yet?{" "}
            <Link href="/auth/signup" className="underline text-accent">
              Sign up
            </Link>{" "}
            instead.
          </div>
          {error && <div className="text-red-500">Oops! {error}</div>}
        </div>
        <div className="flex justify-center mt-4">
          <Button
            text="Sign in"
            type="submit"
            onClick={handleForm}
            className="px-8 py-2"
          />
        </div>
      </form>
    </div>
  );
}

export default Page;
