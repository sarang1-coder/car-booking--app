"use client";
import React, { useState, useEffect } from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import CarList from "@/data/CarList";
import Cars from "./Cars";

const Booking = () => {
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      setScreenHeight(window.innerHeight);
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div className="col-lg-4 col-md-12 d-flex justify-content-center align-items-center mb-4">
      <div
        className="booking-container p-4 border"
        style={{
          height: "auto",
          width: "100%",
          maxWidth: "100rem",
          overflow: "hidden",
        }}
      >
        <h4 className="mb-4">Booking Details</h4>
        <AutoCompleteAddress />
        <Cars />
      </div>
    </div>
  );
};

export default Booking;
