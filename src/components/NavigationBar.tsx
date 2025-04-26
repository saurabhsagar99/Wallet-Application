"use client"

import React, { Profiler } from "react";
import LoginModal from "@/components/LoginModal";
import RuneIcon from "@/components/RuneIcon";
import AccountButton from "./Profile";
import { auth } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const scrollToSection = (sectionId: string | null) => {
  if (sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
};

function SectionLinks() {
  return (
    <div className="hidden md:flex gap-8">
        <div
          className="hover:underline cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          About
        </div>
        <div
          className="hover:underline cursor-pointer"
          onClick={() => scrollToSection("features")}
        >
          Features
        </div>
        <div
          className="hover:underline cursor-pointer"
          onClick={() => scrollToSection("faq")}
        >
          FAQ
        </div>
        <div
          className="hover:underline cursor-pointer"
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </div>
      </div>
  )
}

export default function NavigationBar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <div className={`${pathname === "/" ? "" : "border"} flex justify-between items-center p-4 md:px-20 backdrop-blur-[12px] z-10 top-0 left-0 sticky w-full`}>
      <RuneIcon />
      {pathname === "/" ? <SectionLinks /> : <div></div>}
      <div>
        {status === "loading" ? <div className="animate-pulse bg-gray-200 h-10 w-32 rounded-xl" /> : status==="unauthenticated" ? (
          <LoginModal>Login</LoginModal>
        ) : (
          <div className="flex gap-4">
            {" "}
            <AccountButton />
          </div>
        )}
      </div>
    </div>
  );
}
