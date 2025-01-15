"use client";

import { Button, Checkbox, Form, Input, Spinner } from "@nextui-org/react";
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react"; // Import ChangeEvent & FormEvent
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  terms: boolean;
}

interface FieldErrors {
  name: boolean;
  email: boolean;
  phone: boolean;
  terms: boolean;
}

const WelcomeSignup = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    countryCode: "+61",
    terms: false,
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
    name: false,
    email: false,
    phone: false,
    terms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFieldErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleCountryCodeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: e.target.value,
    }));
    setFieldErrors((prev) => ({
      ...prev,
      phone: false,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading to true before the request starts
    const errors: FieldErrors = {
      name: false,
      email: false,
      phone: false,
      terms: false,
    };

    if (!formData.name) {
      errors.name = true;
    }
    if (!formData.email) {
      errors.email = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = true;
    }

    if (!formData.phone) {
      errors.phone = true;
    } else if (!/^[0-9]{8,11}$/.test(formData.phone)) {
      errors.phone = true;
    }

    if (!formData.terms) {
      errors.terms = true;
    }

    setFieldErrors(errors);

    if (Object.values(errors).every((error) => !error)) {
      console.log("Form submitted successfully", formData);
      // Reset form data before redirecting
      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+61",
        terms: false,
      });
      setFieldErrors({
        name: false,
        email: false,
        phone: false,
        terms: false,
      });

      // Redirect to the landing page
      await router.push("/landing");
    }
    setIsSubmitting(false); // Set loading to false after the submission (whether successful or not)
  };

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
          <h1 className="text-xs font-semibold mt-3">Lennock Volkswagen</h1>
          <p className="text-color2 text-[8px]">POWERED BY ALEXIUM</p>
        </div>
      </div>

      {/* body */}
      <div className="mt-16">
        <div>
          <h2 className="text-[25px] font-medium">Welcome to Alexium</h2>
          <h3 className="text-base mt-3">Thank you for visiting us today.</h3>
          <p className="text-xs text-color2 mt-3">
            We're excited to help you find your perfect vehicle and provide you
            with personalised service.
          </p>
        </div>
        {/* Input */}
        <Form className="mt-10 flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            size="sm"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={fieldErrors.name}
            errorMessage={fieldErrors.name ? "Name is required" : ""}
            classNames={{
              inputWrapper: "bg-color3 rounded-md",
            }}
          />
          <Input
            label="Email"
            type="email"
            size="sm"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={fieldErrors.email}
            errorMessage={
              fieldErrors.email
                ? !formData.email
                  ? "Email is required"
                  : "Invalid email format"
                : ""
            }
            classNames={{
              inputWrapper: "bg-color3 rounded-md",
            }}
          />
          <Input
            label="Contact Number"
            type="tel"
            size="sm"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            isInvalid={fieldErrors.phone}
            errorMessage={
              fieldErrors.phone
                ? !formData.phone
                  ? "Phone number is required"
                  : "Invalid phone number format. Use 8 to 11 digits"
                : ""
            }
            classNames={{
              inputWrapper: "bg-color3 rounded-md",
            }}
          />
          <div className="flex gap-2 relative">
            <select
              className="bg-color3 rounded-md py-3 w-[80px] text-color2 text-sm relative top-[2px]"
              onChange={handleCountryCodeChange}
              value={formData.countryCode}
            >
              <option value="+61">🇦🇺 +61</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+91">🇮🇳 +91</option>
            </select>
            <Input
              type="tel"
              size="sm"
              name="phone"
              placeholder=""
              value={formData.phone}
              onChange={handleChange}
              isInvalid={fieldErrors.phone}
              errorMessage={
                fieldErrors.phone
                  ? !formData.phone
                    ? "Phone number is required"
                    : "Invalid phone number format. Use 8 to 11 digits"
                  : ""
              }
              classNames={{
                inputWrapper: "bg-color3 rounded-md w-full",
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Checkbox
              size="sm"
              name="terms"
              isSelected={formData.terms}
              onChange={handleChange}
              isInvalid={fieldErrors.terms}
              classNames={{
                label: "text-[10px] text-color2",
              }}
            >
              I agree to Alexium's Privacy Policy and Terms of Use.
            </Checkbox>
            {fieldErrors.terms && (
              <span className="text-red-500 text-xs">
                You must agree to the terms and conditions.
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="bg-color1 w-full mt-10 text-white"
            isDisabled={isSubmitting}
          >
            {isSubmitting ? <Spinner color="white" size="sm" /> : "Check-In"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default WelcomeSignup;
