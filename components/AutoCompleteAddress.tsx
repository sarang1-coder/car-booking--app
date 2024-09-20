"use client";
import React, { useState, useEffect } from "react";
import "../public/css/autocomplete.css";
import useBookingStore from "../store";


const AutoCompleteAddress = () => {
  const {
    pickup,
    drop,
    setpickup,
    setdrop,
    dateTime,
    setDateTime,
    setPickupCoords,
    setDropCoords,
  } = useBookingStore();

  const [isLoading, setIsLoading] = useState(false);

  const [userLocation, setUserLocation] = useState<any>();

  const [pickupSource, setPickupSource] = useState<string>("");
  const [dropoffSource, setDropoffSource] = useState<string>("");
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<any[]>([]);

  // Open suggestions only if pickup or dropoff address is selected
  const [isPickupSelected, setIsPickupSelected] = useState<boolean>(false);
  const [isDropoffSelected, setIsDropoffSelected] = useState<boolean>(false);

  // Adding debounce effect to limit API calls
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

  // Call API to get suggestions
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
  const handleAddressClick = (item: any, type: "pickup" | "dropoff") => {
    if (type === "pickup") {
      setPickupSource(item.place_formatted);
      setpickup(item.place_formatted);
      setPickupCoords({ lat: item.lat, lng: item.lon });
      setIsPickupSelected(true);
      setPickupSuggestions([]);
    } else {
      setDropoffSource(item.place_formatted);
      setdrop(item.place_formatted);
      setDropCoords({ lat: item.lat, lng: item.lon });
      setIsDropoffSelected(true);
      setDropoffSuggestions([]);
    }
  };

  const getuserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  useEffect(() => {
    getuserLocation();
  }, []);

  console.log("userLocation", userLocation);
  console.log("pickupSource", pickupSource);

  console.log("dropoffSource", dropoffSource);

  return (
    <div className="container">
      <form>
        <div className="mb-3 row">
          <label
            htmlFor="pickupLocation"
            className="form-label col-sm-12 col-md-3"
          >
            Pickup Location
          </label>
          <div className="col-sm-12 col-md-9">
            <input
              type="text"
              className="form-control"
              id="pickupLocation"
              value={pickupSource}
              placeholder="Enter pickup location"
              onChange={(e) => {
                setPickupSource(e.target.value);
                setpickup(e.target.value);
                setIsPickupSelected(false);
              }}
              required
            />
            {pickupSuggestions.length > 0 && !isPickupSelected && (
              <div className="list-group mt-2">
                {pickupSuggestions.map((item: any, index: number) => (
                  <button
                    key={index}
                    className="address-item list-group-item"
                    onClick={() => handleAddressClick(item, "pickup")}
                  >
                    {item.place_formatted}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-3 row">
          <label
            htmlFor="dropoffLocation"
            className="form-label col-sm-12 col-md-3"
          >
            Dropoff Location
          </label>
          <div className="col-sm-12 col-md-9">
            <input
              type="text"
              className="form-control"
              id="dropoffLocation"
              value={dropoffSource}
              placeholder="Enter Drop location"
              onChange={(e) => {
                setDropoffSource(e.target.value);
                setdrop(e.target.value);
                setIsDropoffSelected(false);
              }}
              required
            />
            {dropoffSuggestions.length > 0 && !isDropoffSelected && (
              <div className="list-group mt-2">
                {dropoffSuggestions.map((item: any, index: number) => (
                  <button
                    key={index}
                    className="address-item list-group-item"
                    onClick={() => handleAddressClick(item, "dropoff")}
                  >
                    {item.place_formatted}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="dateTime" className="form-label col-sm-12 col-md-3">
            Date & Time
          </label>
          <div className="col-sm-12 col-md-9">
            <input
              type="datetime-local"
              className="form-control"
              id="dateTime"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AutoCompleteAddress;
