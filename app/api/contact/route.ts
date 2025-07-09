import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { name, phone, email, comment, type } = body;

  if (!name || !email || !comment || !phone || !type) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("archicontrol");

    const result = await db.collection("contactrequests").insertOne({
      name,
      phone,
      email,
      message: comment, // 🔁 matches "message" in schema
      submittedAt: new Date(), // 🔁 matches "$defs.Date" schema
      type,
    });

    return NextResponse.json(
      {
        message: "Message stored successfully",
        id: result.insertedId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
