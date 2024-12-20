"use client";
import React, { useEffect } from "react";
import { useGlobalContext } from "@/context/Store";
import Dashboard from "@/screens/Dashboard";
import Accounts from "@/screens/Accounts";
import Vehicles from "@/screens/Vehicles";
import Notes from "@/screens/Notes";
import {
  decryptObjData,
  deleteAllCookies,
  encryptObjData,
  getCookie,
} from "@/modules/encryption";
import { useRouter } from "next/navigation";
const Home = () => {
  const { state, setState, activeTab, setActiveTab } = useGlobalContext();
  const router = useRouter();
  const user = getCookie("uid");
  const details = getCookie("uid");
  let userdetails = {
    USER: {
      name: "",
      email: "",
      id: "",
    },
    LOGGEDAT: "",
  };
  if (details) {
    userdetails = decryptObjData("uid");
  }
  useEffect(() => {
    if (userdetails?.USER?.email != "") {
      setState({
        USER: {
          name: userdetails.name,
          username: userdetails.username,
          email: userdetails.email,
          id: userdetails.id,
        },
      });
    } else {
      router.push("/login");
    }
  }, []);
  return (
    <div>
      <div style={{ top: 0, position: "-webkit-sticky", marginBottom: 10 }}>
        <button
          type="button"
          onClick={() => setActiveTab(0)}
          className={`btn btn-primary ${
            activeTab !== 0 ? "btn-sm" : "text-decoration-underline"
          } m-2`}
        >
          <i className="bi bi-house-fill"> Dashboard</i>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab(1)}
          className={`btn btn-info ${
            activeTab !== 1 ? "btn-sm" : "text-decoration-underline"
          } m-2`}
        >
          <i className="bi bi-car-front-fill"> Vehicles</i>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab(2)}
          className={`btn btn-success ${
            activeTab !== 2 ? "btn-sm" : "text-decoration-underline"
          } m-2`}
        >
          <i class="bi bi-wallet-fill"> Accounts</i>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab(3)}
          className={`btn btn-warning ${
            activeTab !== 3 ? "btn-sm" : "text-decoration-underline"
          } m-2`}
        >
          <i className="bi bi-journal-bookmark-fill"> Notes</i>
        </button>
        <button
          type="button"
          onClick={() => {
            deleteAllCookies();
            router.push("/login");
          }}
          className={`btn btn-danger m-2`}
        >
          <i className="bi bi-box-arrow-right"> Sign Out</i>
        </button>
      </div>
      {activeTab === 0 ? (
        <Dashboard />
      ) : activeTab === 1 ? (
        <Vehicles />
      ) : activeTab === 2 ? (
        <Accounts />
      ) : activeTab === 3 ? (
        <Notes />
      ) : null}
    </div>
  );
};

export default Home;
