"use client";
import React, { useState, useEffect } from "react";

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
          height: screenHeight,
          width: "100%",
          maxWidth: "100rem",
        }}
      >
        <h4 className="mb-4">Booking Details</h4>

        <form>
          <div className="mb-3">
            <label htmlFor="pickupLocation" className="form-label">
              Pickup Location
            </label>
            <input type="text" className="form-control" id="pickupLocation" />
          </div>
          <div className="mb-3">
            <label htmlFor="dropoffLocation" className="form-label">
              Dropoff Location
            </label>
            <input type="text" className="form-control" id="dropoffLocation" />
          </div>
          <div className="mb-3">
            <label htmlFor="dateTime" className="form-label text-gray-50">
              Date & Time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="dateTime"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
