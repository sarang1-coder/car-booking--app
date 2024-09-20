"use client";
import Booking from "@/components/Booking";
import MapPlaceholder from "@/components/MapPlaceholder";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="container-fluid mt-4"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className="row" style={{ height: "100%" }}>
        <div className="col-md-6" style={{ flex: "0 0 40%" }}>
          <Booking />
        </div>
        <div
          className="col-md-6"
          style={{
            flex: "0 0 60%",
          }}
        >
          <MapPlaceholder />
        </div>
      </div>
    </div>
  );
}
