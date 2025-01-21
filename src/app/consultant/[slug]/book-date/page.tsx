"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BookDatePage = () => {
  const router = useRouter();
  return (
    <div className="border max-w-sm min-h-screen mx-auto py-4 px-10">
      <Image
        src="/alexium-logo-2.webp"
        width={79}
        height={17}
        alt=""
        className="mx-auto"
      />
      <div className="flex gap-5 items-center mt-10">
        <Image
          src="/arrow-left.png"
          width={16}
          height={16}
          alt=""
          className="hover:opacity-70"
          onClick={() => router.push("/consultant/[slug]")}
        />

        <h2 className="text-2xl font-semibold">Select Date and Time</h2>
      </div>
      <div className="mt-10 flex gap-4">
        <Button className="bg-color3 font-semibold text-sm rounded-full w-full text-color1">
          Reset
        </Button>
        <Button
          className="bg-color1 font-semibold text-sm rounded-full w-full text-white"
          onPress={() => router.push("/consultant/[slug]/book-form")}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default BookDatePage;
