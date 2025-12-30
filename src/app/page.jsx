"use client";
import React, { useEffect, useState } from "react";
import Typed from "typed.js";
import { useGlobalContext } from "../context/Store";
import { useRouter } from "next/navigation";
import { decryptObjData, getCookie } from "@/modules/encryption";

export default function Home() {
  const router = useRouter();
  const { state, setState } = useGlobalContext();
  const el = React.useRef(null);
  const [width, setWidth] = useState(100);
  const details = getCookie("uid");
  const LOGGEDAT = getCookie("info");
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
    document.title = "Welcome To MExpense App";
    const typed = new Typed(el.current, {
      strings: ["Welcome To MExpense App"],
      typeSpeed: 50,
      loop: true,
      loopCount: Infinity,
      showCursor: true,
      cursorChar: "|",
      autoInsertCss: true,
    });

    setWidth(window.screen.width);

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);
  useEffect(() => {
    if (userdetails?.USER?.email === "") {
      router.push("/login");
    } else {
      setState({
        USER: {
          name: userdetails?.USER?.name,
          username: userdetails?.USER?.username,
          email: userdetails?.USER?.email,
          id: userdetails?.USER?.id,
        },
        LOGGEDAT: LOGGEDAT,
      });
      router.push("/home");
    }
  }, []);
  return (
    <div className="container my-5">
      <div className="my-3" style={{ height: "70px" }}>
        {width < 780 ? (
          <span
            className="text-primary text-center fs-6 mb-3 web-message"
            ref={el}
          />
        ) : (
          <span
            className="text-primary text-center fs-3 mb-3 web-message"
            ref={el}
          />
        )}
      </div>
    </div>
  );
}
