import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db("archicontrol");
   const projects = await db
  .collection("categories")
  .find({})
  .sort({ sortOrder: 1 })
  .toArray();

    return NextResponse.json(projects, { status: 200 });
  } catch (err) {
    console.error("Fetch error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
