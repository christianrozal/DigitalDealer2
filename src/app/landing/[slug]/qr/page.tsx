"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import React from "react";

const QRPage = () => {
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
      <Link href={`/landing/${slug}`}>
        <Image
          src="/arrow-left.png"
          width={16}
          height={16}
          alt=""
          className="mt-10 hover:opacity-70"
        />
      </Link>
      <h2 className="mt-10">
        The below QR is to be used by the{" "}
        <span className="font-bold">Sales Consultant.</span>
      </h2>
      <p className="mt-5">
        This connects you with the sales consultant so that we can take care of
        all your needs faster.
      </p>
      {/* Clickable QR Code */}
      <div className="bg-color3 p-12 rounded-md mt-16">
        <p className="text-center text-sm font-bold">SCAN QR CODE</p>
        <div className="p-3 rounded-lg mt-2">
          <QRCodeSVG
            value={slug || "No ID"}
            className="w-48 h-48 mx-auto"
            bgColor="#F4F8FC"
            fgColor="#3D12FA"
            aria-label="Sales Consultant Landing Page QR Code"
          />
        </div>
      </div>
    </div>
  );
};

export default QRPage;
