"use client";
import React, { useState, useEffect } from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import CarList from "@/data/CarList";
import Cars from "./Cars";
import Cards from "./Cards";
import { toast } from "react-toastify";

const Booking = () => {
  const [screenHeight, setScreenHeight] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [hasBooked, setHasBooked] = useState(false);

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

  const handleClick = () => {
    if (hasBooked) {
      return;
    }
    if (!isClicked) {
      setIsClicked(true);
      setHasBooked(true);
      toast.success("Booking Done", {
        autoClose: 5000,
      });
    } else {
      toast.error("Issue with booking");
    }
  };

  return (
    <div className="col-lg-10 col-md-10 d-flex justify-content-center align-items-center mb-4 p-3">
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
        <Cards />
        <button
          className={`w-100 mt-5 py-2 px-4 rounded transition-colors duration-300 ${
            isClicked
              ? "bg-white text-black border border-black"
              : "bg-black text-white"
          } hover:${
            isClicked ? "bg-gray-100 text-black" : "bg-gray-800 text-white"
          } focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50`}
          onClick={handleClick}
        >
          {hasBooked ? "Booking Done" : "Book It"}
        </button>
      </div>
    </div>
  );
};

export default Booking;
