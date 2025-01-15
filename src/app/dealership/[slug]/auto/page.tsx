"use client";

import { useParams } from "next/navigation";
import React from "react";

const AutoRecognitionPage = () => {
  const { slug } = useParams();
  return <div>ID: {slug}</div>;
};

export default AutoRecognitionPage;
