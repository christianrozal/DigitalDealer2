"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { account } from "./lib/appwrite";

const Home = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
          onPress={() => router.push("/consultant/678def9400177e527a26")}
          className="bg-color1 font-semibold text-white"
        >
          Consultant
        </Button>

        <Button
          onPress={handleLogout}
          className="bg-color1 font-semibold text-white"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Home;
