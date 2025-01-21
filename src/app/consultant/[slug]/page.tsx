"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store";
import { fetchConsultant } from "@/app/lib/features/consultantSlice";

const ConsultantSlugPage = () => {
  const router = useRouter();
  const { slug } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: consultant,
    loading,
    error,
  } = useSelector((state: RootState) => state.consultant);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(fetchConsultant(slug as string));
    }
  }, [slug, dispatch]);

  const generateVCard = () => {
    if (!consultant) return "";

    const nameParts = consultant.name.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    return `BEGIN:VCARD
VERSION:3.0
FN:${consultant.name}
N:${lastName};${firstName};;;
ORG:Alexium
TITLE:${consultant.position}
EMAIL:${consultant.email}
TEL:${consultant.phone}
URL:www.alexium.com.au
END:VCARD`;
  };

  const setConfirmation = () => {
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000);
  };

  const handleSaveContact = () => {
    if (!consultant) return;

    const vCardData = generateVCard();
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${consultant.name.replace(" ", "_")}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setConfirmation();
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!consultant)
    return <div className="text-center p-4">Consultant not found</div>;

  const initials = consultant.name.trim().substring(0, 2).toUpperCase();

  return (
    <>
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="fixed top-5 max-w-xs w-[90%] flex gap-2 border rounded-md border-color5 py-3 px-3 justify-center items-center bg-white opacity-100 z-50 left-1/2"
            style={{ boxShadow: "0px 4px 10px 0px rgba(7, 170, 48, 0.25)" }}
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, x: "-50%" }}
            key="confirmation"
          >
            <Image
              src="/icon-check.webp"
              width={17}
              height={17}
              alt="Checkmark"
            />
            <p className="text-xs">Contact Saved</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border max-w-sm min-h-screen mx-auto py-4 px-10">
        <Image
          src="/alexium-logo-2.svg"
          width={79}
          height={17}
          alt="Alexium Logo"
          className="mx-auto"
        />

        <div className="flex flex-col items-center justify-center shadow-md p-10 mt-10 rounded-md">
          <div className="bg-color1 text-white font-bold w-[100px] h-[100px] text-4xl rounded-full flex items-center justify-center">
            {initials}
          </div>
          <h2 className="font-nunito font-semibold mt-4">{consultant.name}</h2>
          <p className="text-xs text-color2 mt-2">{consultant.position}</p>
          <div className="flex gap-2 items-center mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/social-facebook.svg"
                width={25}
                height={25}
                alt="Facebook"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/social-linkedin.svg"
                width={25}
                height={25}
                alt="LinkedIn"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/social-instagram.svg"
                width={25}
                height={25}
                alt="Instagram"
              />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/social-youtube.svg"
                width={25}
                height={25}
                alt="YouTube"
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-xs mt-7">
          <div className="flex gap-4 items-center py-3 rounded-md bg-color3 px-5">
            <Image src="/icon-email.svg" width={17} height={17} alt="Email" />
            <p>{consultant.email}</p>
          </div>
          <div className="flex gap-4 items-center py-3 rounded-md bg-color3 px-5">
            <Image src="/icon-phone.svg" width={17} height={17} alt="Phone" />
            <p>{consultant.phone}</p>
          </div>
          <div className="flex gap-4 items-center py-3 rounded-md bg-color3 px-5">
            <Image
              src="/icon-website.svg"
              width={17}
              height={17}
              alt="Website"
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
          <Button
            className="bg-color3 font-semibold text-sm rounded-full w-full text-color1 mt-5"
            onPress={() => router.push(`/consultant/${slug}/book-date`)}
          >
            Book An Appointment
          </Button>
        </div>
      </div>
    </>
  );
};

export default ConsultantSlugPage;
