"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { firestore } from "@/context/FirbaseContext";
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  collection,
  updateDoc,
  where,
} from "firebase/firestore";
import Loader from "@/components/Loader";
import { v4 as uuid } from "uuid";
import { decryptObjData, getCookie } from "@/modules/encryption";
import useWindowSize from "@rooks/use-window-size";
import {
  createDownloadLink,
  DateValueToSring,
  formatDateAndTime,
} from "@/modules/calculatefunctions";

import { useGlobalContext } from "@/context/Store";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Vehicles = () => {
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const { state, vehicleState, setVehicleState, setStateObject } =
    useGlobalContext();
  const router = useRouter();
  const [data, setData] = useState(false);

  const [loader, setLoader] = useState(false);
  const getData = async () => {
    setLoader(true);
    const querySnapshot = await getDocs(query(collection(firestore, "bikes")));
    const datas = querySnapshot.docs
      .map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }))
      .sort((a, b) => b.date - a.date);
    setLoader(false);
    setVehicleState(datas);
  };
  const getNoticeData = () => {
    if (vehicleState.length === 0) {
      getData();
    } else {
      let newData = vehicleState.sort((a, b) => b.date - a.date);
      setLoader(false);
      setVehicleState(newData);
    }
  };
  const perWidth = (value) => {
    return (innerWidth * value) / 100;
  };
  const perHeight = (value) => {
    return (innerHeight * value) / 100;
  };
  useEffect(() => {
    document.title = "MExpense: Vehicles";
    getNoticeData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      {loader ? (
        <Loader />
      ) : (
        <div className="mx-auto">
          <h3>Vehicles</h3>
          {vehicleState.map((vehicle, index) => (
            <div
              style={{
                flexWrap: "wrap",
                width: "100%",
                padding: 10,
              }}
              className="mx-auto"
              key={index}
            >
              <div className="d-flex flex-row justify-content-between align-items-center mx-auto my-3">
                <div
                  className="col-md-4"
                  style={{
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 5,
                    borderRadius: 5,
                    flexWrap: "wrap",
                  }}
                >
                  <h5>{vehicle?.bikeName.toUpperCase().slice(0, 15)}</h5>
                  <h6>Milage: {vehicle?.milage} KM/LITRE</h6>
                  <h6>Petrol Added: {vehicle?.petrolAdded} KM</h6>
                  <h6>Total Run: {vehicle?.totalRun} KM</h6>
                  <h6>
                    Next Oil Change Distance: {vehicle?.nextOilChangeDistance}{" "}
                    KM
                  </h6>
                  <h6>
                    service Date: {formatDateAndTime(vehicle?.serviceDate)}
                  </h6>
                  <h6>Fulled On: {formatDateAndTime(vehicle?.date)}</h6>
                </div>
                <div className="col-md-4">
                  <Image
                    src={require(`@/images/${
                      vehicle?.vehicleType === "Bike" ? "bike.png" : "car.png"
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
                  <div>
                    <button type="button" className="btn btn-primary m-1">
                      Edit
                    </button>
                    <button type="button" className="btn btn-danger m-1">
                      Delete
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn btn-success m-1"
                    onClick={() => {
                      setStateObject(vehicle);
                      router.push("/vehicleDetails");
                    }}
                  >
                    Fueling
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Vehicles;
