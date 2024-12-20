"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import Typed from "typed.js";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const { state, setState } = useGlobalContext();
  const user = state.USER;
  const router = useRouter();
  const el = React.useRef(null);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [`Welcome ${user.name}, to MExpense App`],
      typeSpeed: 50,
      loop: true,
      loopCount: Infinity,
      showCursor: true,
      cursorChar: "|",
      autoInsertCss: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!state) {
      router.push("/login");
    }
    console.log(user);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => router.push("/login")}
      >
        Log Out
      </button>
      <div className="mx-auto my-2" style={{ height: "120px" }}>
        <span
          className="text-primary text-center fs-3 mb-3 web-message"
          ref={el}
        />
      </div>

      <p>Welcome to your dashboard!</p>
      <p>Here you can view your expenses, accounts, vehicles, and notes.</p>
      <p>
        Click on any of the navigation links to access the respective screens.
      </p>
      <div>
        <h6>WELCOME {user.name}!</h6>

        <h6>Using This App You Can Manage your daily Needs.</h6>
        <h6>This App has three sections.</h6>
        <h6>1. Fueling:</h6>
        <h6>
          Here You Can Manage and Track your Vehicle fuelings easily. Just Add
          Your Vehicle with a Sweet Photo of It. After Entering to that
          particular Vehicle Section, Put Fuel Price and Fuel Quantity or
          Amount. You will get all details.
        </h6>
        <h6>2. Expense:</h6>
        <h6>
          Here You Can Manage and Track your Expense easily. Just Add Your
          Account with a Sweet Photo of It. After Entering to that particular
          Account Section, Submit desired Expenses.
        </h6>
        <h6>3. Notes:</h6>
        <h6>
          Here You Can Manage and Track your Daily To Do List or Important Notes
          easily.
        </h6>
        <h6>You can easily Edit or Delete You Entered Data.</h6>
        <h6>In Case Of Facing Any Difficulty Email Me</h6>
        <h6>maidul365@gmail.com</h6>
        <h6>
          All Your Data Stored In Apps Database is Secured in Encrypted Format
          with Strict Policy. No Personal Data will be shared to Anybody.
        </h6>
      </div>
    </div>
  );
}
