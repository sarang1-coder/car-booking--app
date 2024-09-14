import CarList from "@/data/CarList";
import React, { useState } from "react";
import Image from "next/image";
import "../public/css/car.css";

const Cars = () => {
  const [selectedCar, setSelectedCar] = useState<number | null>(null);

  return (
    <div className="container py-4">
      <h4 className="mb-4 mt-4">Select Car</h4>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {CarList.map((item, index) => (
          <div
            key={index}
            className="col w-50"
            onClick={() => setSelectedCar(index)}
          >
            <div className={`card ${selectedCar === index ? "selected" : ""}`}>
              <Image
                src={item.image}
                alt={item.name}
                layout="responsive"
                width={100}
                height={100}
                className="card-img-top backdrop-blur-0"
              />
              <div className="card-body">
                <div className="card-title">{item.name}</div>
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

export default Cars;
