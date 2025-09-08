"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBoxIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { setTheme } = useTheme();

  return (
    <div className="h-16 top-0 flex items-center justify-between border-b shadow-sm">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-[35%] flex justify-center">
            <Image src="/logo.png" alt="logo" width={60} height={60} />
          </div>

          {/* Text section - 65% */}
          <div className="w-[65%] hidden lg:block">
            <div className="font-bold text-sm leading-tight p-4">
              <div>Personal</div>
              <div>Finance</div>
              <div>Tracker</div>
            </div>
          </div>
        </Link>
      </div>
      {/* RIGHT */}
      <div className="flex items-center space-x-4 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <SignedIn>
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
          >
            <Button variant="outline">
              <LayoutDashboard size={18} />
              <span className="hidden md:inline">Dashboard</span>
            </Button>
          </Link>
          <Link href="/transaction/create">
            <Button className="flex items-center gap-2">
              <PenBoxIcon size={18} />
              <span className="hidden md:inline">Add Transaction</span>
            </Button>
          </Link>
        </SignedIn>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline">Login</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            userProfileUrl="/user-profile"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
