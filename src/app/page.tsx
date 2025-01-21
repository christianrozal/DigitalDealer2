"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const router = useRouter();

  return (
    <div className="w-sreen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5">
        <Button
          onPress={() => router.push("/dealership/capital-toyota/signup")}
          className="bg-color1 font-semibold text-white"
        >
          Sign Up
        </Button>
        <Button
          onPress={() => router.push("/consultant/adfsjfhas")}
          className="bg-color1 font-semibold text-white"
        >
          Consultant
        </Button>
      </div>
    </div>
  );
};

export default Home;
