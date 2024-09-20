import React from "react";
import Image from "next/image";
import withSelection from "@/components/ListItemHOC";
import PaymentItemList from "@/data/PaymentItemList";
import "../public/css/cards.css";

interface PaymentItem {
  image: string;
  name: string;
}

interface PaymentItemProps {
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

const Cards: React.FC<PaymentItemProps> = ({ selectedIndex, onSelect }) => {
  return (
    <div className="container py-4">
      <h4 className="mb-4 mt-4">Select Cards</h4>
      <div className="row row-cols-4 g-4">
        {PaymentItemList.map((item: PaymentItem, index: number) => (
          <div
            key={index}
            className="col d-flex justify-content-center"
            onClick={() => onSelect(index)}
          >
            <div
              className={`card ${selectedIndex === index ? "selected" : ""}`}
            >
              <div className="position-relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  layout="responsive"
                  className="card-img-top"
                  style={{ borderRadius: "50%" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withSelection(Cards);
