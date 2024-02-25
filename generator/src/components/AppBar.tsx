import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import { ActivitySquare, Home, LucideIcon, BadgePlus, LayoutDashboard } from "lucide-react";
import { Input } from "./ui/input";
import { string } from "zod";

export const Header = () => {
  return (
    <header className="flex flex-row gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      <div className="flex flex-row gap-2 items-center">
        <ActivitySquare />
        <h2 className=" text-2xl font-extrabold">Generator</h2>
      </div>

      <Input placeholder="Search" />

      <SignInButton />
    </header>
  )
}

interface ILinkInfoElem {
  id : string;
  icon : LucideIcon;
  name : string;
  href : string
}

const LinkInfoList = [
  {
    id : "home",
    icon : Home,
    name : "Home",
    href : "/"
  }, {
    id : "dashboard",
    icon : LayoutDashboard,
    name : "Dashboard",
    href : "/dashboard"
  }, {
    id : "create-website",
    icon : BadgePlus,
    name : "Create a website",
    href : "/dashboard/website"
  }
];

const AppBar = () => {
  return (
    <header className="flex flex-col gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      {
        LinkInfoList.map(elem => <Link key={elem.id} className="transition-colors hover:text-blue-500 flex flex-row gap-2" href={elem.href}>
        <elem.icon /> {elem.name}
      </Link>)
      }
    </header>
  );
};

export default AppBar;