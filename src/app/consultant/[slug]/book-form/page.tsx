"use client";
import { Button, Input, Textarea } from "@heroui/react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store";
import { databases, account, ID } from "@/app/lib/appwrite";
import { setFormField, clearForm } from "@/app/lib/features/bookingFormSlice";
import { clearBookingDate } from "@/app/lib/features/bookingDateSlice";
import dayjs from "dayjs";
import { Query } from "appwrite";

const BookFormPage = () => {
  const router = useRouter();
  const { slug } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { formData } = useSelector((state: RootState) => state.bookingForm);
  const { selectedDate, selectedTime } = useSelector(
    (state: RootState) => state.bookingDate
  );

  const generateRandomPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    return Array.from(
      { length: 12 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    console.log("=== STARTING SUBMISSION ===");

    try {
      // Validation
      if (
        !formData.name?.trim() ||
        !formData.email?.trim() ||
        !selectedDate ||
        !selectedTime
      ) {
        alert("Please fill all required fields");
        return;
      }

      if (!validateEmail(formData.email)) {
        alert("Please enter a valid email address");
        return;
      }

      const email = formData.email.toLowerCase().trim();
      let customerId: string;

      // User creation
      try {
        await account.getSession("current");
      } catch {
        const password = generateRandomPassword();
        await account.create(
          ID.unique(),
          email,
          password,
          formData.name.trim()
        );
      }

      // Customer handling
      const existingCustomers = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_CUSTOMERS_ID!,
        [Query.equal("email", email)]
      );

      if (existingCustomers.total > 0) {
        customerId = existingCustomers.documents[0].$id;
      } else {
        const customer = await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_CUSTOMERS_ID!,
          ID.unique(),
          {
            name: formData.name.trim(),
            email: email,
            phone: formData.phone?.trim() || "",
          }
        );
        customerId = customer.$id;
      }

      // Date/time handling
      const combinedDateTime = dayjs(
        `${selectedDate} ${selectedTime}`,
        "YYYY-MM-DD h:mm A"
      );

      if (!combinedDateTime.isValid()) {
        throw new Error("Invalid date/time combination");
      }

      // Appointment creation
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENTS_ID!,
        ID.unique(),
        {
          date: combinedDateTime.toISOString(),
          customer_message: formData.message?.trim() || "",
          customers: customerId,
          consultants: slug,
        }
      );

      // Cleanup
      dispatch(clearForm());
      dispatch(clearBookingDate());
      router.push(`/consultant/${slug}/appointment-booked`);
    } catch (error) {
      console.error("FULL ERROR:", error);
      alert(
        "Appointment booking failed. Please check the console for details."
      );
    }
  };

  return (
    <div className="border max-w-sm min-h-screen mx-auto py-4 px-10">
      <Image
        src="/alexium-logo-2.svg"
        width={79}
        height={17}
        alt="Alexium Logo"
        className="mx-auto"
        priority
        style={{ width: "79px", height: "auto" }}
      />

      <div className="flex gap-5 items-center mt-10">
        <Image
          src="/arrow-left.svg"
          width={16}
          height={16}
          alt="Back"
          className="hover:opacity-70 cursor-pointer"
          onClick={() => router.back()}
          style={{ width: "16px", height: "16px" }}
        />
        <h2 className="text-2xl font-semibold">Finalize Booking</h2>
      </div>

      {selectedDate && selectedTime && (
        <div className="mt-4 bg-color3 p-3 rounded-md">
          <p className="font-semibold text-sm">
            {dayjs(selectedDate).format("dddd, MMMM D")}
          </p>
          <p className="text-color2 text-sm mt-1">
            {dayjs(selectedTime, "h:mm A").format("h:mm A")}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 mt-5">
        <Input
          label="Full Name"
          value={formData.name}
          onChange={(e) =>
            dispatch(setFormField({ field: "name", value: e.target.value }))
          }
          classNames={{ inputWrapper: "bg-color3 rounded-md" }}
          isRequired
        />
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            dispatch(setFormField({ field: "email", value: e.target.value }))
          }
          classNames={{ inputWrapper: "bg-color3 rounded-md" }}
          isRequired
        />
        <Input
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={(e) =>
            dispatch(setFormField({ field: "phone", value: e.target.value }))
          }
          classNames={{ inputWrapper: "bg-color3 rounded-md" }}
        />
        <Textarea
          label="Special Requests"
          value={formData.message}
          onChange={(e) =>
            dispatch(setFormField({ field: "message", value: e.target.value }))
          }
          classNames={{ inputWrapper: "border-gray-300 border rounded-md" }}
        />
      </div>

      <div className="mt-10">
        <Button
          className="bg-color1 font-semibold text-sm rounded-full w-full text-white"
          onPress={handleSubmit}
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default BookFormPage;
