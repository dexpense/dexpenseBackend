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

import {
  createDownloadLink,
  DateValueToSring,
} from "@/modules/calculatefunctions";

import { useGlobalContext } from "@/context/Store";
import { useRouter } from "next/navigation";

const Vehicles = () => {
  const router = useRouter();
  const { state, vehicleState, setVehicleState, activeTab, setActiveTab } =
    useGlobalContext();
  const [data, setData] = useState(false);

  const [allData, setAllData] = useState([]);
  const [loader, setLoader] = useState(false);
  const getData = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, "bikes")));
    const datas = querySnapshot.docs
      .map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }))
      .sort((a, b) => b.date - a.date);
    setData(true);
    setVehicleState(datas);
    setVehicleState(datas);
  };
  const getNoticeData = () => {
    if (vehicleState.length === 0) {
      getData();
    } else {
      let newData = vehicleState.sort((a, b) => b.date - a.date);
      setData(true);
      setVehicleState(newData);
    }
  };

  useEffect(() => {
    document.title = "MExpense: Vehicles";
    getNoticeData();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    console.log(vehicleState);
  }, [vehicleState]);
  return (
    <div className="container">
      {loader ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-between"></div>
      )}
      <h3>Vehicles</h3>
      {vehicleState.map((vehicle, i) => (
        <div key={i}>
          <h6>Vehicle Name: {vehicle.bikeName}</h6>
        </div>
      ))}
    </div>
  );
};

export default Vehicles;
