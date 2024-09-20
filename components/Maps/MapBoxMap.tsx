"use client";
import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import useBookingStore from "../../store";
import { FaMapMarkerAlt } from "react-icons/fa";

const MapBoxMap: React.FC = () => {
  const { pickup, drop, pickupCoords, dropCoords } = useBookingStore();
  console.log("p", pickup, drop, pickupCoords, dropCoords);
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: pickupCoords?.longitude,
          latitude: pickupCoords?.latitude,
          zoom: 3.5,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {pickupCoords && dropCoords && (
          <Marker longitude={-100} latitude={40} anchor="bottom">
            <FaMapMarkerAlt size={24} color="red" />
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default MapBoxMap;
