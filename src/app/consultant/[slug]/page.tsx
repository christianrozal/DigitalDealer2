"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import React from "react";

const ConsultantSlugPage = () => {
  const generateVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Alex Bompane
N:Bompane;Alex;;;
ORG:Alexium
TITLE:Sales Consultant
EMAIL:abompane@alexium.com.au
TEL:(03) 9847 7927
URL:www.alexium.com.au
END:VCARD`;
    return vCardData;
  };
  const handleSaveContact = () => {
    const vCardData = generateVCard();
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Alex Bompane.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the element after download.
    URL.revokeObjectURL(url); // Revoke the URL after download.
  };

  return (
    <div className="border max-w-sm min-h-screen mx-auto py-4 px-10">
      <Image
        src="/alexium-logo-2.webp"
        width={79}
        height={17}
        alt=""
        className="mx-auto"
      />
      <div className="flex flex-col items-center justify-center shadow-md p-10 mt-20">
        <div className="bg-color1 text-white font-bold w-[100px] h-[100px] text-4xl rounded-full flex items-center justify-center">
          AL
        </div>
        <h2 className="font-nunito font-semibold mt-4">Alex Bompane</h2>
        <p className="text-xs text-color2 mt-2">Sales Consultant</p>
        <div className="flex gap-2 items-center mt-4">
          <Image
            src="/social-facebook.webp"
            width={25}
            height={25}
            alt="Facebook Icon"
          />
          <Image
            src="/social-linkedin.webp"
            width={25}
            height={25}
            alt="Linkedin Icon"
          />
          <Image
            src="/social-instagram.webp"
            width={25}
            height={25}
            alt="Instagram Icon"
          />
          <Image
            src="/social-youtube.webp"
            width={25}
            height={25}
            alt="Youtube Icon"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 text-xs mt-5">
        <div className="flex gap-4 items-center py-3 rounded-md bg-color3 px-5">
          <Image
            src="/icon-email.webp"
            width={17}
            height={17}
            alt="Email Icon"
          />
          <p>abompane@alexium.com.au</p>
        </div>
        <div className="flex gap-4 items-center py-3 rounded-md bg-color3 px-5">
          <Image
            src="/icon-phone.webp"
            width={17}
            height={17}
            alt="Phone Icon"
          />
          <p>(03) 9847 7927</p>
        </div>
        <div className="flex gap-4 items-center py-3 rounded-md bg-color3 px-5">
          <Image
            src="/icon-website.webp"
            width={17}
            height={17}
            alt="Website Icon"
          />
          <p>www.alexium.com.au</p>
        </div>
      </div>

      <div className="mt-10">
        <Button
          className="bg-color1 font-semibold text-sm rounded-full w-full text-white"
          onPress={handleSaveContact}
        >
          Save Contact
        </Button>
        <Button className="bg-color3 font-semibold text-sm rounded-full w-full text-color1 mt-5">
          Book An Appointment
        </Button>
      </div>
    </div>
  );
};

export default ConsultantSlugPage;
