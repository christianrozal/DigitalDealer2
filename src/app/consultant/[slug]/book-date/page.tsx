"use client";

import { Button, Select, SelectItem } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(isoWeek);
dayjs.extend(updateLocale);

// Set week to start on Sunday (0)
dayjs.updateLocale("en", {
  weekStart: 0,
});

const BookDatePage = () => {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate month options for dropdown
  const generateMonthOptions = () => {
    const currentYear = currentMonth.year();
    return Array.from({ length: 12 }, (_, i) => ({
      key: `${currentYear}-${i}`,
      label: dayjs().year(currentYear).month(i).format("MMMM YYYY"),
    }));
  };

  // Generate calendar grid with Sunday-first weeks
  const generateCalendar = () => {
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const calendar = [];

    let currentDate = startOfMonth.startOf("week");

    while (currentDate.isBefore(endOfMonth.endOf("month").endOf("week"))) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(currentDate);
        currentDate = currentDate.add(1, "day");
      }
      calendar.push(week);
    }

    return calendar;
  };

  // Time slots
  const timeSlots = [
    "10:00 AM",
    "10:30 AM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
  ];

  // Month selection handler
  const handleMonthChange = (keys: any) => {
    const selected = Array.from(keys as Set<string>)[0];
    if (!selected) return;

    const [year, month] = selected.split("-").map(Number);
    setCurrentMonth(dayjs().year(year).month(month));
  };

  // Navigation handlers
  const handlePreviousMonth = () =>
    setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  // Reset selection
  const handleReset = () => {
    setSelectedDate(null);
    setSelectedTime(null);
  };

  // Booking handler
  const handleBookNow = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time");
      return;
    }
    router.push(
      `/consultant/[slug]/book-form?date=${selectedDate.format(
        "YYYY-MM-DD"
      )}&time=${selectedTime}`
    );
  };

  return (
    <div className="border max-w-sm min-h-screen mx-auto py-4 px-10">
      <Image
        src="/alexium-logo-2.svg"
        width={79}
        height={17}
        alt="Alexium Logo"
        className="mx-auto"
      />
      <div className="flex gap-5 items-center mt-10">
        <Image
          src="/arrow-left.svg"
          width={16}
          height={16}
          alt="Back"
          className="hover:opacity-70 cursor-pointer"
          onClick={() => router.push("/consultant/[slug]")}
        />
        <h2 className="text-2xl font-semibold">Select Date and Time</h2>
      </div>

      {/* Calendar Header */}
      <div className="mt-8 flex items-center justify-between">
        <div className="relative">
          <Select
            selectedKeys={
              new Set([`${currentMonth.year()}-${currentMonth.month()}`])
            }
            onSelectionChange={(keys) => handleMonthChange(keys)}
            className="w-48"
            variant="underlined"
            classNames={{
              value: "text-lg font-semibold",
            }}
          >
            {generateMonthOptions().map((month) => (
              <SelectItem key={month.key} textValue={month.label}>
                {month.label}
              </SelectItem>
            ))}
          </Select>
          {/* Smart underline hack: White overlay hides HeroUI's default underline */}
          <div className="absolute -bottom-1 bg-white h-2 w-full" />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePreviousMonth}
            className="hover:opacity-70 p-1"
          >
            <Image
              src="/previous-month.svg"
              width={16}
              height={16}
              alt="Previous Month"
            />
          </button>
          <button onClick={handleNextMonth} className="hover:opacity-70 p-1">
            <Image
              src="/next-month.svg"
              width={16}
              height={16}
              alt="Next Month"
            />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="mt-4">
        <div className="grid grid-cols-7 gap-1 mb-2 text-center text-sm text-gray-500">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {generateCalendar().map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((date, dayIndex) => {
              const isCurrentMonth = date.month() === currentMonth.month();
              const isSelected = selectedDate?.isSame(date, "day");
              const isWeekend = [0, 6].includes(date.day()); // 0 = Sunday, 6 = Saturday
              const isDisabled =
                !isCurrentMonth || date.isBefore(dayjs(), "day") || isWeekend;

              return (
                <button
                  key={dayIndex}
                  onClick={() => !isDisabled && setSelectedDate(date)}
                  className={`text-center p-2 rounded-full text-sm font-medium
                    ${isDisabled ? "text-gray-300 cursor-not-allowed" : ""}
                    ${isSelected ? "bg-color1 text-white" : ""}
                    ${!isSelected && !isDisabled ? "hover:bg-color3" : ""}
                    ${!isCurrentMonth ? "text-gray-300" : "text-black"}`}
                  disabled={isDisabled}
                >
                  {date.date()}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="mt-8">
          <h3 className="font-semibold mb-4">Available Time Slots</h3>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                className={`text-sm py-2 ${
                  selectedTime === time
                    ? "bg-color1 text-white"
                    : "bg-white text-gray-500 border"
                }`}
                onPress={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-10 flex gap-4">
        <Button
          className="bg-color3 font-semibold text-sm rounded-full w-full text-color1"
          onPress={handleReset}
        >
          Reset
        </Button>
        <Button
          className="bg-color1 font-semibold text-sm rounded-full w-full text-white"
          onPress={handleBookNow}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default BookDatePage;
