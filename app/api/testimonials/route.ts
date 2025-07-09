import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db("archicontrol");

  const testimonials = await db
    .collection("testimonials")
    .find({ isActive: true })
    .sort({ displayOrder: 1 })
    .toArray();

  client.close();

  return NextResponse.json(testimonials);
}
