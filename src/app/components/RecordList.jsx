"use client";
import React, { useEffect, useState } from "react";
function RecordList() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            const res = await fetch("/api/records");
            const data = await res.json();
            setRecords(data.records);
        };
        fetchRecords();
    }, []);

    const handleDelete = async (id) => {
        const res = await fetch(`/api/records?id=${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            setRecords(records.filter(record => record._id !== id));
        }
    };
    return (
        <div>
            <h3 className="text-2xl font-bold">Record List</h3>
            <ul>
                {records.map(record => (
                    <li key={record._id} className="flex justify-between items-center py-2">
                        <span>{record.amount} - {record.type} - {record.notes}</span>
                        <button onClick={() => handleDelete(record._id)} className="text-red-500">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecordList;