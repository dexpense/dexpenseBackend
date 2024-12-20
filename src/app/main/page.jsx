"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";

export default function Main() {
  const { state, setState } = useGlobalContext();
  const user = state.USER;
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    console.log(user);
  }, [user]);
  return (
    <div className="container">
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => router.push("/login")}
      >
        Log Out
      </button>
    </div>
  );
}
