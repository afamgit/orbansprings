import { NextResponse } from "next/server";
import { prisma } from "@/scripts";
import { z } from "zod";

export async function GET(req: Request, { params }: { params: any }) {
  try {
    const {id} = await params;
    const meterReading = await prisma.meterReadings.findUnique({
      where: {
        id: parseInt(id),
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

export async function PUT(req: Request, { params }: { params: any }) {
  try {
    const {id} = await params;
    const body = await req.json();

    const { first_reading, afternoon_reading, last_reading } = body;

    const parsedCredentials = z
      .object({
        first_reading: z.string(),
        afternoon_reading: z.string(),
        last_reading: z.string(),
      })
      .safeParse(body);

    if (!parsedCredentials.success) {
      return NextResponse.json({ meter_reading: null, message: 'Please provide all the required information' });
    }

    const updatedMeterReading = await prisma.meterReadings.update({
      where: {
        id: parseInt(id),
      },
      data: {
        first_reading: first_reading,
        afternoon_reading: afternoon_reading,
        last_reading: last_reading,
      },
    });

    return NextResponse.json({ meter_reading: updatedMeterReading, message: `Meter reading successfully updated` });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update meter reading', error });
  }
}

export async function DELETE(req: Request, { params }: { params: any }) {
  try {
    const {id} = await params;
    await prisma.meterReadings.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ message: 'Meter reading successfully deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete meter reading', error });
  }
}
