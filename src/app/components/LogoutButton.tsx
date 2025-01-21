// app/components/LogoutButton.tsx
"use client";
import { useRouter, useParams } from "next/navigation";
import React from "react";
import { account } from "@/app/lib/appwrite";

const LogoutButton = () => {
  const router = useRouter();
  const { slug } = useParams();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.push(`/dealership/${slug}/signup`);
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white bg-color1 rounded-full w-full"
    >
      Not You?
    </button>
  );
};

export default LogoutButton;
