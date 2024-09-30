

"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import RecordList from "./components/RecordList";



function HomePage() {
  const [records, setRecords] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0 });

  // Fetch records from the API
  const fetchRecords = async () => {
    try {
      const res = await fetch("/api/records", { method: "GET", cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch records");

      const data = await res.json();
      setRecords(data.records);
    } catch (error) {
      console.error("Error loading records:", error);
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    const income = records
      .filter((record) => record.type === "income")
      .reduce((acc, record) => acc + record.amount, 0);
    const expense = records
      .filter((record) => record.type === "expense")
      .reduce((acc, record) => acc + record.amount, 0);
    setTotals({ income, expense });
  };

  // Update task status
  const updateStatus = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/records/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: !currentStatus }),
      });

      if (!res.ok) throw new Error("Failed to update record status");
      fetchRecords(); // Refresh records
    } catch (error) {
      console.error("Error updating record status:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [records]);
  const formatNumber = (number) => {
    return new Intl.NumberFormat('th-TH', { style: 'decimal' }).format(number);
};

  return (
    <div>
      <Navbar />
      <main className="container mx-auto my-5">
        <h1 className="text-4xl font-bold mb-4 font-thai">Income-Expense Tracker</h1>
        <div className="flex justify-between mb-6">
          <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold text-green-700">Total Income
          </h2>
          <p className="text-xl">{formatNumber(totals.income)} Baht</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-red-700">Total Expenses</h2>
            <p className="text-xl">{formatNumber(totals.expense)} Baht</p>
          </div>
        </div>
        <RecordList records={ records} updateStatus={updateStatus} />
        <diV></diV>
       
 
      </main>
    </div>
  );
}

export default HomePage;
