"use client";
import React, { useState, useEffect } from "react";
import "../public/css/autocomplete.css";

const AutoCompleteAddress = () => {
  const [pickupSource, setPickupSource] = useState<string>("");
  const [dropoffSource, setDropoffSource] = useState<string>("");
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<any[]>([]);

  //open suggestions only if pickup or dropoff address is selected
  const [isPickupSelected, setIsPickupSelected] = useState<boolean>(false);
  const [isDropoffSelected, setIsDropoffSelected] = useState<boolean>(false);

  //adding debounce effect to limit API call from 1ms
  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (!isPickupSelected && pickupSource) {
        fetchSuggestions(pickupSource, "pickup");
      } else {
        setPickupSuggestions([]);
      }

      if (!isDropoffSelected && dropoffSource) {
        fetchSuggestions(dropoffSource, "dropoff");
      } else {
        setDropoffSuggestions([]);
      }
    }, 1000);

    return () => clearTimeout(debounceFn);
  }, [pickupSource, dropoffSource, isPickupSelected, isDropoffSelected]);

  // call API to get suggestions
  const fetchSuggestions = async (
    query: string,
    type: "pickup" | "dropoff"
  ) => {
    try {
      const response = await fetch(
        `/api/search-address?q=${encodeURIComponent(query)}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (type === "pickup") {
        setPickupSuggestions(data.suggestions || []);
      } else {
        setDropoffSuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.error("Error fetching address list:", error);
      if (type === "pickup") {
        setPickupSuggestions([]);
      } else {
        setDropoffSuggestions([]);
      }
    }
  };
  // Handle address selection
  const handleAddressClick = (address: string, type: "pickup" | "dropoff") => {
    if (type === "pickup") {
      setPickupSource(address);
      setIsPickupSelected(true);
      setPickupSuggestions([]);
    } else {
      setDropoffSource(address);
      setIsDropoffSelected(true);
      setDropoffSuggestions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with", { pickupSource, dropoffSource });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="pickupLocation" className="form-label">
            Pickup Location
          </label>
          <input
            type="text"
            className="form-control"
            id="pickupLocation"
            value={pickupSource}
            onChange={(e) => {
              setPickupSource(e.target.value);
              setIsPickupSelected(false);
            }}
          />
          {pickupSuggestions.length > 0 && !isPickupSelected && (
            <div className="list-group mt-2">
              {pickupSuggestions.map((item: any, index: number) => (
                <button
                  key={index}
                  className="address-item"
                  onClick={() =>
                    handleAddressClick(item.place_formatted, "pickup")
                  }
                >
                  {item.place_formatted}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="dropoffLocation" className="form-label">
            Dropoff Location
          </label>
          <input
            type="text"
            className="form-control"
            id="dropoffLocation"
            value={dropoffSource}
            onChange={(e) => {
              setDropoffSource(e.target.value);
              setIsDropoffSelected(false);
            }}
          />
          {dropoffSuggestions.length > 0 && !isDropoffSelected && (
            <div className="list-group mt-2">
              {dropoffSuggestions.map((item: any, index: number) => (
                <button
                  key={index}
                  className="address-item"
                  onClick={() =>
                    handleAddressClick(item.place_formatted, "dropoff")
                  }
                >
                  {item.place_formatted}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="dateTime" className="form-label text-gray-50">
            Date & Time
          </label>
          <input type="datetime-local" className="form-control" id="dateTime" />
        </div>

        <button type="submit" className="btn btn-primary">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default AutoCompleteAddress;
