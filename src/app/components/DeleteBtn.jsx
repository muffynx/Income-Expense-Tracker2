"use client";
import React from "react";
import { useRouter } from "next/navigation";


function DeleteBtn({ id }) {
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure you want to delete this record?");
        if (confirmed) {
            try {
                const res = await fetch(`/api/records/${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    router.refresh(); // Refresh the current route to reflect changes
                } else {
                    const data = await res.json();
                    throw new Error(data.message || "Failed to delete the record");
                }
            } catch (error) {
                console.error(error);
                alert(error.message);
            }
        }
    };
    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white border py-2 rounded-md text-lg px-3"
        >
            Delete
        </button>
    );
}

export default DeleteBtn;