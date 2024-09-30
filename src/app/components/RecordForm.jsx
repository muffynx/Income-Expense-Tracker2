"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

function RecordForm() {
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("income");
    const [notes, setNotes] = useState("");


    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!amount || !date || !notes) {
            alert("Please complete all inputs");
            return;
        }
        try {
            const res = await fetch("/api/records", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount, date, type, notes }),
            });
            if (res.ok) {
                router.push('/');
            } else {
                const data = await res.json();
                throw new Error(data.message || "Failed to create record");
            }
        } catch (error) {
            console.error("Error creating record:", error);
        }
    };
    return (
        <div className="container mx-auto py-10">
            <h3 className="text-3xl font-bold">Create Record</h3>
            <hr className="my-3" />
            <Link href="/" className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2">Go back</Link>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                    placeholder="Amount"
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                    required
                />
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                    placeholder="Notes"
                    rows="3"
                />
                <button type="submit" className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2">
                    Create Record
                </button>
            </form>
        </div>
    );
}
export default RecordForm;



