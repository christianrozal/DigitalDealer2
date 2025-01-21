"use client";

import { Button, Input, Textarea } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BookFormPage = () => {
  const router = useRouter();
  return (
    <div className="border max-w-sm min-h-screen mx-auto py-4 px-10">
      <Image
        src="/alexium-logo-2.svg"
        width={79}
        height={17}
        alt=""
        className="mx-auto"
      />
      <div className="flex gap-5 items-center mt-10">
        <Image
          src="/arrow-left.svg"
          width={16}
          height={16}
          alt=""
          className="hover:opacity-70 cursor-pointer"
          onClick={() => router.push("/consultant/[slug]/book-date")}
        />

        <h2 className="text-2xl font-semibold">Book Appointment</h2>
      </div>
      <p className="text-color2 text-xs mt-5">
        Please fill out the details below so that we can book the appointment
        for you.
      </p>
      <div className="flex flex-col gap-3 mt-5">
        <Input label="Name" />
        <Input label="Email" />
        <Textarea label="Your message" />
      </div>
      <div className="mt-10">
        <Button
          className="bg-color1 font-semibold text-sm rounded-full w-full text-white"
          onPress={() => router.push("/consultant/[slug]/appointment-booked")}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default BookFormPage;
