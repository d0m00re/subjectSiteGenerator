"use client"

import React from "react";
import { LucideIcon, ExternalLink } from "lucide-react";

interface IButtonTextTheme {
  children : string;
  Icon : LucideIcon;
  dim ?: {w : number, h : number};
}

export const ButtonTextThemeHover = (props : IButtonTextTheme) => {
  return (
    <section className="hover:text-blue-800 text-gray-800 flex h-full flex-row items-center gap-2 cursor-pointer border-2 p-1 border-gray-500 hover:border-blue-800 rounded-sm">
      <props.Icon width={props?.dim?.w ?? 20} height={props?.dim?.h ?? 20} />
      <p className='text-2sm '>{props.children}</p>
    </section>
  )
}