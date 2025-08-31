"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const HeroPage = () => {
  return (
    <div className="pt-20">
      <div className="flex flex-col text-center">
        <h1 className="text-3xl mx-auto md:text-8xl lg:text-[70px] pb-6 gradient-title">
          Take Control of Your Finances <br /> with Ease
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A simple and powerful finance tracker that helps you record, monitor,
          and understand your spending habits to achieve your financial goals.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div className="m-5 px-8">
        <Image
          src="/banner.png"
          alt=""
          width={1280}
          height={720}
          className="rounded-xl shadow-2xl border mx-auto"
        />
      </div>
    </div>
  );
};

export default HeroPage;
