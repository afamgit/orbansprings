import { NextResponse } from "next/server";
import { prisma } from "@/scripts";
import { z } from "zod";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const meterReading = await prisma.meterReadings.findUnique({
      where: {
        id: id,
      },
      include: {
        meter: true,
      },
    });
    return NextResponse.json(meterReading);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch meter reading', error });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();

    const { reading_morning, reading_afternoon, reading_evening } = body;

    const parsedCredentials = z
      .object({
        reading_morning: z.number(),
        reading_afternoon: z.number(),
        reading_evening: z.number(),
      })
      .safeParse(body);

    if (!parsedCredentials.success) {
      return NextResponse.json({ meter_reading: null, message: 'Please provide all the required information' });
    }

    const updatedMeterReading = await prisma.meterReadings.update({
      where: {
        id: id,
      },
      data: {
        reading_morning: reading_morning,
        reading_afternoon: reading_afternoon,
        reading_evening: reading_evening,
      },
    });

    return NextResponse.json({ meter_reading: updatedMeterReading, message: `Meter reading successfully updated` });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update meter reading', error });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    await prisma.meterReadings.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ message: 'Meter reading successfully deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete meter reading', error });
  }
}
