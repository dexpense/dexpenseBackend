"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/Store";
import { Loader } from "rsuite";
import Link from "next/link";
import { firestore } from "../context/FirbaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import Dashboard from "@/screens/Dashboard";
import Login from "@/screens/Login";
const Main = () => {
  const { state, activeTab, setActiveTab } = useGlobalContext();
  return (
    <div className="container mx-auto">
      {activeTab === 0 ? <Dashboard /> : <Login />}
    </div>
  );
};

export default Main;
