"use client";

import { useState } from "react";
import { MenuIcon, UserCircle, UserCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";

export default function AccountButton() {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Failed to sign out:", error);
      // You could add toast notification here
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center space-x-2 rounded-full"
        >
          <MenuIcon className="h-4 w-4" />
          <Image
            src={session.data?.user?.image || ""}
            alt="profile"
            className="rounded-full"
            width={25}
            height={25}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end" sideOffset={8}>
        <DropdownMenuItem asChild>
          <Link href="/" className="flex w-full cursor-pointer items-center">
            Go to Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
