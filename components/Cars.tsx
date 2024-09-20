import React from "react";
import Image from "next/image";
import withSelection from "@/components/ListItemHOC";
import CarList from "@/data/CarList";
import "../public/css/car.css";

interface CarItem {
  image: string;
  name: string;
  charges: number;
}

interface CarsProps {
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

const Cars: React.FC<CarsProps> = ({ selectedIndex, onSelect }) => {
  return (
    <div className="container py-4">
      <h4 className="mb-4 mt-4">Select Car</h4>
      <div className="row row-cols-2 g-4">
        {" "}
        {/* Change to two columns per row */}
        {CarList.map((item: CarItem, index: number) => (
          <div key={index} className="col d-flex justify-content-center">
            <div
              className={`car ${selectedIndex === index ? "selected" : ""}`}
              onClick={() => onSelect(index)}
              style={{ width: "150px", borderRadius: "1rem" }}
            >
              <div className="position-relative" style={{ height: "7rem" }}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  layout="responsive"
                  className="car-img-top"
                />
              </div>
              <div className="car-body p-2">
                <div className="car-title">{item.name}</div>
                <small>
                  <b>{item.charges * 10} Rs.</b>
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withSelection(Cars);
