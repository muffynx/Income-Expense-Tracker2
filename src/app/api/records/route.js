import { connectMongoDB } from "../../../../lib/mongodb";
import Record from "../../../../models/Record";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { amount, date, type, notes } = await req.json();
    console.log("Received data:", { amount, date, type, notes });

    await connectMongoDB();
    await Record.create({ amount, date, type, notes });
    return NextResponse.json({ message: "Record created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const records = await Record.find({});
    return NextResponse.json({ records });
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Record.findByIdAndDelete(id);
    return NextResponse.json({ message: "Record deleted" }, { status: 200 });
}
