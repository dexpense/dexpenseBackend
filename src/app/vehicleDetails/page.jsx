"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../context/Store";
import { formatDateAndTime, IndianFormat } from "@/modules/calculatefunctions";
import Image from "next/image";

export default function VehicleDetails() {
  const { state, stateObject } = useGlobalContext();
  const router = useRouter();
  const [data, setData] = useState(stateObject);
  return (
    <div className="container my-3">
      <div className="mx-auto">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: 5,
            borderRadius: 5,
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h5>{stateObject?.bikeName?.toUpperCase()?.slice(0, 15)}</h5>
            <h6>Milage: {stateObject?.milage} KM/LITRE</h6>
            <h6>Petrol Added: {stateObject?.petrolAdded} KM</h6>
            <h6>Total Run: {stateObject?.totalRun} KM</h6>
            <h6>Oil Changed At: {stateObject?.oilChangedAt} KM</h6>
            <h6>
              Next Oil Change Distance: {stateObject?.nextOilChangeDistance} KM
            </h6>
            <h6>service Date: {formatDateAndTime(stateObject?.serviceDate)}</h6>
            <h6>Fulled On: {formatDateAndTime(stateObject?.date)}</h6>
            <h6>Service Cost: ₹ {IndianFormat(stateObject?.serviceCost)}</h6>
          </div>
          <div>
            <Image
              src={require(`@/images/${
                stateObject?.vehicleType === "Bike" ? "bike.png" : "car.png"
              }`)}
              width={200}
              height={150}
              alt="vehicleImg"
              style={{
                borderRadius: 5,
                width: "80%",
                height: "auto",
              }}
              className="col-md-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
