import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

function validateData(data: any) {
  const errors = [];
  if (!data.name || data.name.trim() === "") errors.push("Name is required");
  if (!data.phone || !/^\d{10}$/.test(data.phone.replace(/\D/g, "")))
    errors.push("Valid 10-digit phone is required");
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email))
    errors.push("Valid email is required");
  if (!data.propertyType) errors.push("Property type is required");
  if (!data.state) errors.push("State is required");
  if (!data.district || data.district.trim() === "")
    errors.push("District is required");
  if (!data.constructionStage) errors.push("Construction stage is required");
  if (!data.budget) errors.push("Budget is required");
  return errors;
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const validationErrors = validateData(data);
  if (validationErrors.length > 0) {
    return NextResponse.json(
      { message: "Validation failed", errors: validationErrors },
      { status: 400 }
    );
  }

  // TODO: save data to DB, etc.
  try {
    const client = await connectToDatabase();
    const db = client.db("archicontrol");

    // Insert quote into collection
    const result = await db.collection("quotationrequests").insertOne({
      ...data,
      submittedAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Quote received successfully",
        id: result.insertedId,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
// You can also export GET, PUT, DELETE, etc. if needed
