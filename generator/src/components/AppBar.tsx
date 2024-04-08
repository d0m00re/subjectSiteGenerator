"use client"

import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import { ActivitySquare, Home, LucideIcon, BadgePlus, LayoutDashboard, ExternalLink } from "lucide-react";
import SheetTheme from "./Theme/SheetTheme/SheetTheme";
import { usePathname } from 'next/navigation'
import { ButtonTextThemeHover } from "./atoms/ButtonTextThemeHover/ButtonTextThemeHover";

export const Header = () => {
  const pathname = usePathname();
  const pathnameSplit = pathname.split("/");
  const id = pathnameSplit[pathnameSplit.length - 1];

  return (
    <header className="flex flex-row justify-between gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow sticky top-0 z-10">
      <div className="flex flex-row gap-2 items-center">
        <ActivitySquare />
        <h2 className=" text-2xl font-extrabold">Generator</h2>
      </div>

      {pathname.startsWith("/dashboard/website/") ?
        <section className="flex flex-row gap-2">
          <SheetTheme />
          <a href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/view/${id}`} target="_blank">
            <ButtonTextThemeHover
              Icon={ExternalLink}
            >View</ButtonTextThemeHover>
          </a>
        </section>
        : <></>
      }
      <section className="flex flex-row gap-2">
        <SignInButton />
      </section>
    </header>
  )
}

interface ILinkInfoElem {
  id: string;
  icon: LucideIcon;
  name: string;
  href: string
}

const LinkInfoList: ILinkInfoElem[] = [
  {
    id: "home",
    icon: Home,
    name: "Home",
    href: "/"
  }, {
    id: "create-website",
    icon: BadgePlus,
    name: "Website",
    href: "/dashboard/website"
  }
];

const AppBar = () => {
  return (
    <main className="fixed w-[150px] flex flex-col gap-2 p-4 bg-gradient-to-b from-white to-gray-200 shadow min-h-screen h-full">
      {
        LinkInfoList.map(elem => <Link key={elem.id} className="transition-colors hover:text-blue-500 flex flex-row gap-2 w-[100px] p-2 hover:bg-slate-200 rounded  " href={elem.href}>
          <elem.icon /> {elem.name}
        </Link>)
      }
    </main>
  );
};

export default AppBar;