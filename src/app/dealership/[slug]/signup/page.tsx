"use client";
import { useParams, useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { databases, createCustomer } from "@/app/lib/appwrite";
import { Query } from "appwrite";
import Image from "next/image";
import { Form, Input, Checkbox, Button, Spinner } from "@nextui-org/react";
import { databaseId, dealershipsId } from "@/app/lib/appwrite";

interface FormData {
  name: string;
  email: string;
  phone: string;
  terms: boolean;
}

interface FieldErrors {
  name: boolean;
  email: boolean;
  phone: boolean;
  terms: boolean;
}

const SignupPage = () => {
  const { slug } = useParams();
  const [dealershipName, setDealershipName] = useState<string | null>(null);
  const [dealershipId, setDealershipId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    terms: false,
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
    name: false,
    email: false,
    phone: false,
    terms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appwriteError, setAppwriteError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (slug && typeof slug === "string") {
      const fetchDealership = async () => {
        try {
          if (!databaseId || !dealershipsId) {
            throw new Error("Database or Dealership ids are not defined");
          }
          const response = await databases.listDocuments(
            databaseId,
            dealershipsId,
            [Query.equal("name", slug.replace(/-/g, " "))]
          );

          if (response.documents.length > 0) {
            setDealershipName(response.documents[0].name);
            setDealershipId(response.documents[0].$id);
          } else {
            setError("Dealership not found");
          }
        } catch (err) {
          setError("Failed to fetch dealership");
        }
      };
      fetchDealership();
    }
  }, [slug]);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAppwriteError(null);
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
      try {
        if (!dealershipId) {
          throw new Error("Dealership not found");
        }
        // Create customer document in Appwrite
        const { terms, ...customerDataWithoutTerms } = formData;
        const response = await createCustomer({
          ...customerDataWithoutTerms,
          dealerships: [dealershipId],
        });
        // Reset form data before redirecting
        setFormData({
          name: "",
          email: "",
          phone: "",
          terms: false,
        });
        setFieldErrors({
          name: false,
          email: false,
          phone: false,
          terms: false,
        });

        if (response && response.$id) {
          router.push(`/landing/${response.$id}`);
        } else {
          throw new Error("Failed to redirect after creation");
        }
      } catch (error: any) {
        setAppwriteError(error.message || "Failed to create customer");
      }
    }
    setIsSubmitting(false);
  };

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!dealershipName) {
    return <div>Loading...</div>;
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
            {dealershipName}
          </h1>
          <p className="text-color2 text-[8px]">POWERED BY ALEXIUM</p>
        </div>
      </div>

      {/* body */}
      <div className="mt-16">
        <div>
          <h2 className="text-[25px] font-medium">
            Welcome to {dealershipName}
          </h2>
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
          {appwriteError && (
            <span className="text-red-500 text-xs mt-2">{appwriteError}</span>
          )}
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

export default SignupPage;
