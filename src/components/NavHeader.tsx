/** @format */

import { IoSettingsOutline } from "react-icons/io5";
import { Button } from "./form/Button";
import logOut from "@/firebase/auth/logout";

export function NavHeader() {
  return (
    <div className="flex justify-between px-12 pt-8 pb-4 items-center">
      <div className="font-title text-4xl lowercase">Vessle</div>
      <div className="flex items-center gap-4">
        <IoSettingsOutline className="size-6 text-accent" />
        <Button text="sign out" onClick={logOut} type="submit" className="hover:bg-pink hover:text-primary" />
      </div>
    </div>
  );
}
