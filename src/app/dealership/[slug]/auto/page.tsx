"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { account, databases } from "@/app/lib/appwrite";
import { Avatar, Button } from "@nextui-org/react";
import { customersId, databaseId } from "@/app/lib/appwrite";
import { Query } from "appwrite";
import LogoutButton from "@/app/components/LogoutButton";
import Link from "next/link";

const AutoRecognitionPage = () => {
  const { slug } = useParams();
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processedSlug, setProcessedSlug] = useState<string | null>(null);

  const convertToTitleCase = (str: string): string => {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/(^|\s)\w/g, (match) => match.toUpperCase());
  };

  useEffect(() => {
    if (slug && typeof slug === "string") {
      const formattedSlug = convertToTitleCase(slug.replace(/-/g, " "));
      setProcessedSlug(formattedSlug);
    }
    const fetchUserData = async () => {
      try {
        const user = await account.get();
        setUserName(user.name);
        setUserEmail(user.email);
        const nameParts = user.name.split(" ");
        const first = nameParts[0];
        setFirstName(first);
        // Fetch Customer Data
        if (!databaseId || !customersId) {
          throw new Error("Database or Customer ids are not defined");
        }
        const customerResponse = await databases.listDocuments(
          databaseId,
          customersId,
          [Query.equal("email", user.email)]
        );
        if (customerResponse.documents.length > 0) {
          setCustomerId(customerResponse.documents[0].$id);
        } else {
          setError("Customer not found");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch user details");
      }
    };
    fetchUserData();
  }, [slug]);

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }
  if (!userName || !userEmail) {
    return <div>Loading User Details...</div>;
  }
  if (!customerId) {
    return <div>Loading Customer Details...</div>;
  }

  return (
    <div className="border max-w-sm min-h-screen mx-auto py-12 px-8">
      {/* header */}
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/alexium-logo.webp"
          width={63}
          height={63}
          alt=""
          className="size-[63px]"
        />
        <div className="text-center">
          <h1 className="text-xs font-semibold mt-3 text-black">
            {processedSlug}
          </h1>
          <p className="text-color2 text-[8px]">POWERED BY ALEXIUM</p>
        </div>
      </div>

      <div className="mt-40">
        <h2 className="font-medium text-2xl">Welcome back, {firstName}!</h2>
        <p className="mt-3">Thank you for visiting us today.</p>
        <p className="mt-3 text-xs text-color2">
          We're excited to help you find your perfect vehicle and provide you
          with personalised service.
        </p>
      </div>
      <div className="flex gap-3 items-center border rounded-lg p-3 mt-10">
        <div>
          <Avatar
            name={userName}
            className="bg-color1 text-white font-bold uppercase"
          />
        </div>
        <div>
          <p className="text-sm font-semibold">{userName}</p>
          <p className="text-xs text-color2">{userEmail}</p>
        </div>
      </div>
      <div className="flex gap-5 mt-16">
        <Button
          as={Link}
          href={`/landing/${customerId}`}
          className="text-color1 bg-color3 rounded-full w-full"
        >
          Continue
        </Button>
        <LogoutButton />
      </div>
    </div>
  );
};

export default AutoRecognitionPage;
