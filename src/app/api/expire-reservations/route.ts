import { NextResponse } from "next/server";
import prisma from "@/app/lib/db"; // adjust based on your setup

export async function GET() {
  try {
    const now = new Date();

    const updated = await prisma.reservation.updateMany({
      where: {
        endDate: { lt: now },
        status: { not: "expired" },
      },
      data: {
        status: "expired",
      },
    });

    return NextResponse.json({ message: "Success", updated: updated.count });
  } catch (error) {
    console.error("Error expiring reservations:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}