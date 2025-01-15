"use client";

import Image from "next/image";
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSelectionChange = (keys: any) => {
    const selectedKey = keys.values().next().value;
    setSelectedDealer(selectedKey);
  };

  const handleContinueClick = async () => {
    if (selectedDealer) {
      setIsSubmitting(true); // Set loading state on
      await router.push("/welcome/signup");
      setIsSubmitting(false); // Set loading state off
    }
  };

  return (
    <div>
      <div className="border flex flex-col items-center justify-center max-w-sm min-h-screen mx-auto">
        <Image
          src="/alexium-logo.webp"
          width={116}
          height={116}
          alt=""
          className="size-[116px]"
        />

        <div className="text-center hidden">
          <h1 className="text-xl font-semibold mt-5">Digital Dealer</h1>
          <p className="text-color2 text-[9px] mt-3">POWERED BY ALEXIUM</p>
        </div>

        <div className="mt-10 w-full flex flex-col items-center">
          <Select
            variant="bordered"
            className="max-w-60 "
            label="Choose a Dealer"
            selectedKeys={selectedDealer ? [selectedDealer] : []}
            onSelectionChange={handleSelectionChange}
          >
            <SelectItem key="Dealer 1">Dealer 1</SelectItem>
            <SelectItem key="Dealer 2">Dealer 2</SelectItem>
            <SelectItem key="Dealer 3">Dealer 3</SelectItem>
            <SelectItem key="Dealer 4">Dealer 4</SelectItem>
            <SelectItem key="Dealer 5">Dealer 5</SelectItem>
            <SelectItem key="Dealer 6">Dealer 6</SelectItem>
          </Select>
          <Button
            className={`w-full max-w-60 mt-3 bg-color1 text-white font-bold ${
              selectedDealer ? "opacity-100" : "opacity-0"
            }`}
            isDisabled={!selectedDealer || isSubmitting}
            onPress={handleContinueClick}
          >
            {isSubmitting ? <Spinner color="white" size="sm" /> : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
