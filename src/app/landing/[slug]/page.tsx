"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const LandingPage = () => {
  const { slug } = useParams();

  return (
    <div className="border max-w-sm min-h-screen mx-auto py-4 px-8">
      <Image
        src="/alexium-logo-2.webp"
        width={79}
        height={17}
        alt=""
        className="mx-auto"
      />
      <div>
        <h2 className="text-2xl font-semibold mt-16">Thank you!</h2>
        <p className="text-xs text-color2 mt-3">
          We appreciate you sharing your details.
        </p>
        <p className="text-xs text-color2 mt-3">
          While we get one of our team members across your way, feel free to
          access any of the options below.
        </p>
      </div>
      {/* Cards */}
      <ul className="grid grid-cols-2 gap-5 mt-10 text-xs">
        <Link href="/">
          <li className="bg-color3 rounded-md py-10 text-center px-4 hover:bg-opacity-50">
            Browse Cars
          </li>
        </Link>
        <Link href="/">
          <li className="bg-color3 rounded-md py-10 text-center px-4 hover:bg-opacity-50">
            Book a Test Drive
          </li>
        </Link>
        <Link href="/">
          <li className="bg-color3 rounded-md py-10 text-center px-4 hover:bg-opacity-50">
            Explore Trade-In Options
          </li>
        </Link>
        <Link href="/">
          <li className="bg-color3 rounded-md py-10 text-center px-4 hover:bg-opacity-50">
            Download Brochure
          </li>
        </Link>
        <Link href="/">
          <li className="bg-color3 rounded-md py-10 text-center px-4 hover:bg-opacity-50">
            Enquire Finance
          </li>
        </Link>
      </ul>

      {/* QR Link */}
      <Link href={`/landing/${slug}/qr`}>
        <p className="font-semibold text-xs text-color2 underline text-center mt-20 hover:opacity-70">
          Consultant's QR code
        </p>
      </Link>
    </div>
  );
};

export default LandingPage;
