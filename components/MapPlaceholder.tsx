import React from "react";
import MapBoxMap from "./Maps/MapBoxMap";

const MapPlaceholder = () => {
  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius:"1rem",
        padding: "1rem",
        margin: "0 1rem",
      }}
    >
      <h2>Map Section</h2>
      <MapBoxMap />
    </div>
  );
};

export default MapPlaceholder;
