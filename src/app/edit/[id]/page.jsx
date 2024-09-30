"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import RecordList from "@/app/components/RecordList";
import Navbar from "@/app/components/Navbar";

function EditRecordPage() {
    const params = useParams();
    const { id } = params;
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchRecord = async () => {
        try {
            const res = await fetch(`/api/records/${id}`, { method: "GET" });
            if (!res.ok) throw new Error("Failed to fetch the record");

      const data = await res.json();
      setInitialData(data.record);
      setLoading(false);
    } catch (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
    }
};
useEffect(() => {
    fetchRecord();
  }, [id]);
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  return (
    <div>
      <Navbar />
      <RecordForm initialData={initialData} isEdit={true} />
    </div>
  );
}
export default EditRecordPage;