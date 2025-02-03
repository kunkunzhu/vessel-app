/** @format */

"use client";
import React, { useState } from "react";
import signUp from "@/firebase/auth/signup";
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

    const { result, error } = await signUp(email, password);

    if (error) {
      return console.log(error);
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
          className="flex items-center justify-between gap-4"
        >
          <p className="font-title">Email</p>
          <Input
            icon={<IoIosMail className="2xl text-secondary" />}
            setInput={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
            placeholder="example@mail.com"
            className="min-w-[220px]"
          />
        </label>
        <label
          htmlFor="email"
          className="flex items-center justify-between gap-4"
        >
          <p className="font-title">Password</p>
          <Input
            icon={<FaKey className="2xl text-secondary" />}
            setInput={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
            placeholder="12345"
            className="min-w-[220px]"
          />
        </label>
        <div className="text-xs mb-4">
          <div className="opacity-75">
            Already have an account?{" "}
            <Link href="/auth/signin" className="underline text-accent">
              Sign in
            </Link>{" "}
            instead.
            {error && <div className="text-red-500">Oops! {error}</div>}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            text="Sign up"
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
