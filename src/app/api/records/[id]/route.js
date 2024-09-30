import { connectMongoDB } from "../../../../../lib/mongodb";
import Record from "../../../../../models/Record";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;
    try {
        await connectMongoDB();
        const record = await Record.findById(id);
        if (!record) {
            return NextResponse.json({ message: "Record not found" }, { status: 404 });
          }
          return NextResponse.json({ record }, { status: 200 });
        } catch (error) {
          console.error("Error fetching record:", error);
          return NextResponse.json({ message: "Failed to fetch record" }, { status: 500 });
        }
    }
    export async function PUT(request, { params }) {
        const { id } = params;
        try {
            const { amount, date, type, notes } = await request.json();
                // Validate required fields
    if (amount === undefined || !date || !type || !notes) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
      }
      await connectMongoDB();
      const updatedRecord = await Record.findByIdAndUpdate(
        id,
        { amount, date, type, notes },
        { new: true, runValidators: true }
    );
    if (!updatedRecord) {
        return NextResponse.json({ message: "Record not found" }, { status: 404 });
      }

    return NextResponse.json({ message: "Record updated", record: updatedRecord }, { status: 200 });
} catch (error) {
    console.error("Error updating record:", error);
    return NextResponse.json({ message: "Failed to update record" }, { status: 500 });
  }
}
export async function DELETE(request, { params }) {
    const { id } = params;
    try {
        await connectMongoDB();
        const deletedRecord = await Record.findByIdAndDelete(id);
        if (!deletedRecord) {
            return NextResponse.json({ message: "Record not found" }, { status: 404 });
          }

    return NextResponse.json({ message: "Record deleted", record: deletedRecord }, { status: 200 });
} catch (error) {
    console.error("Error deleting record:", error);
    return NextResponse.json({ message: "Failed to delete record" }, { status: 500 });
  }
}