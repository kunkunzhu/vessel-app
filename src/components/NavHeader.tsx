/** @format */

import { IoSettingsOutline } from "react-icons/io5";

export function NavHeader() {
  return (
    <div className="flex justify-between px-12 pt-8 pb-4 items-center bg-background bg-opacity-25">
      <div className="font-title text-4xl lowercase">Vessel</div>
      <IoSettingsOutline className="size-6 text-accent" />
    </div>
  );
}
