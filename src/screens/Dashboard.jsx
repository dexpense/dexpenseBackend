"use client";
import React, { useEffect } from "react";
import { useGlobalContext } from "@/context/Store";
import { formatDate } from "@/modules/calculatefunctions";
const Dashboard = () => {
  const { state, activeTab } = useGlobalContext();
  
  useEffect(() => {
    console.log(state);
    //eslint-disable-next-line
  }, []);
  return (
    <div className="my-3">
      <h1>Dashboard</h1>
      <p>Welcome {state.USER?.name}! to your expense management application.</p>
      <p>This is the dashboard page.</p>
      <p>Logged At {formatDate(state?.LOGGEDAT)}</p>
      <p>Using This App You Can Manage your daily Needs.</p>
      <p>This App has three sections.</p>
      <p>1. Fueling:</p>
      <p>
        Here You Can Manage and Track your Vehicle fuelings easily. Just Add
        Your Vehicle with a few necessary details. After Entering to that
        particular Vehicle Section, Put Fuel Price and Fuel Quantity or Amount.
        You will get all details.
      </p>
      <p>2. Expense:</p>
      <p>
        Here You Can Manage and Track your Expense easily. Just Add Your Account
        with a few necessary details. After Entering to that particular Account
        Section, Submit desired Expenses.
      </p>
      <p>3. Notes:</p>
      <p>
        Here You Can Manage and Track your Daily To Do List or Important Notes
        easily.
      </p>
      <p>You can easily Edit or Delete You Entered Data.</p>
      <p>In Case Of Facing Any Difficulty Email Me</p>
      <p>trackerexpense0@gmail.com</p>
      <p>
        All Your Data Stored In App&#8217;s Database is Secured in Encrypted
        Format with Strict Policy. No Personal Data will be shared to Anybody.
      </p>
    </div>
  );
};

export default Dashboard;
