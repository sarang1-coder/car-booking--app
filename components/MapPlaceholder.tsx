import React from "react";

const MapPlaceholder = () => {
  return (
    <div className="col-lg-8 col-md-12 d-flex justify-content-center align-items-center">
      <div
        className="map-container"
        style={{
          height: "500px",
          width: "100%",
          backgroundColor: "#f0f0f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Map placeholder */}
        <h4 className="text-center">Map Placeholder</h4>
      </div>
    </div>
  );
};

export default MapPlaceholder;
