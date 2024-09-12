import Booking from "@/components/Booking";
import MapPlaceholder from "@/components/MapPlaceholder";
import Image from "next/image";


export default function Home() {
  return (
    <div className="container mt-4">
      <div className="row">
        <Booking />
        <MapPlaceholder />
      </div>
    </div>
  );
}
