import { Button } from "@heroui/react";
import Image from "next/image";
import React from "react";

const ConsultantSlugPage = () => {
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
          AB
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
          <p>&#40;03&#41; 9847 7927</p>
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
        <Button className="bg-color1 font-semibold text-sm rounded-full w-full text-white">
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
