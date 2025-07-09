import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db("archicontrol");

  const images = await db
    .collection("heroimages")
    .find({ isActive: true })
    .sort({ displayOrder: 1 })
    .toArray();

  const urls = images.map((img) => img.imageUrl);

  client.close();
  return NextResponse.json(urls);
}
