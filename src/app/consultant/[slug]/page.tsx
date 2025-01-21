"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConsultantSlugPage = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const setConfirmation = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2000);
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
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setConfirmation();
  };

  return (
    <>
      {/* Shows when saved */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="fixed top-5 w-[90%] flex gap-2 border rounded-md border-color5 py-3 px-3 justify-center items-center bg-white opacity-100 z-50 left-1/2"
            style={{ boxShadow: "0px 4px 10px 0px rgba(7, 170, 48, 0.25)" }}
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, x: "-50%" }}
            key="confirmation"
          >
            <Image src="/icon-check.webp" width={17} height={17} alt="" />
            <p className="text-xs">Contact Saved</p>
          </motion.div>
        )}
      </AnimatePresence>
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
        <div className="flex flex-col gap-3 text-xs mt-7">
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
    </>
  );
};

export default ConsultantSlugPage;
