"use client";
import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/Store";
import { deleteAllCookies } from "../../modules/encryption";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();
  const { state, setState } = useGlobalContext();

  useEffect(() => {
    setState({
      USER: {
        name: "",
        email: "",
        id: "",
      },
      LOGGEDAT: "",
    });
    deleteAllCookies();
    router.push("/login");

    // eslint-disable-next-line
  }, []);
  return <div className="container"></div>;
};

export default LogOut;
