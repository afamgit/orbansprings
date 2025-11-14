import { NextResponse } from "next/server";
import { prisma } from "@/scripts";
import { z } from "zod";

export async function POST(req: Request) {
   try {
    const body = await req.json()

    const { meterId, first_reading, afternoon_reading, last_reading, reading_date } = body

    const parsedCredentials = z
          .object({ 
            meterId: z.number(), 
            first_reading: z.number(), 
            afternoon_reading: z.number(), 
            last_reading: z.number(), 
            reading_date: z.string() 
          })
          .safeParse(body);

          if(!parsedCredentials.success) {
            return NextResponse.json({meter_reading:null, message: 'Please provide all the required information'})
          }

    const meterExist = await prisma.meters.findUnique({
        where: {
            meterid: meterId,
        }
    })

    if(!meterExist) {
     return NextResponse.json({meter_reading:null, message: `Meter ID not found in the database`})
    }

    const readingExist = await prisma.meterReadings.findFirst({
      where: {
        meterId: meterId,
        reading_date: new Date(reading_date)
      }
    })

    if(readingExist) {
      const updateMeterReading = await prisma.meterReadings.update({
        where: {
          id: readingExist.id
        },
        data: {
          first_reading: first_reading,
          afternoon_reading: afternoon_reading,
          last_reading: last_reading,
        }
      })
      return NextResponse.json({meter_reading: updateMeterReading, message: `Meter reading successfully updated for meter with ID ${meterId}`})
    }

    const postMeterReading = await prisma.meterReadings.create({
        data: {
            meterId: meterId,
            first_reading: first_reading,
            afternoon_reading: afternoon_reading,
            last_reading: last_reading,
            reading_date: new Date(reading_date),
            createdAt: new Date(),
        }
    })


    return NextResponse.json({meter_reading: postMeterReading, message: `Meter reading successfully submitted for meter with ID ${meterId}`})

   } catch(error) {
    return NextResponse.json({message: 'Failed to post meter reading', error})
   }
}

export async function GET() {
  try {
    const meterReadings = await prisma.meterReadings.findMany({
      include: {
        meter: true,
      },
      orderBy: {
        reading_date: 'desc',
      },
    });
    return NextResponse.json(meterReadings);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch meter readings', error });
  }
}
