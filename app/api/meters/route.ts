import { NextResponse } from "next/server";
import { prisma } from "@/scripts";
import { z } from "zod";

export async function POST(req: Request) {
   try {
    const body = await req.json()

    const {username, meterid, tankerid, type, delivery_rate, volume, valve_state } = body

    const parsedCredentials = z
          .object({ username: z.string(), meterid: z.string().min(9).max(10), type: z.string(), delivery_rate_rate: z.string(), volume: z.string(), valve_state: z.string() })
          .safeParse(body);

          if(!parsedCredentials.success) {
            return NextResponse.json({meter:null, message: 'Please provide all the required information'})
          }

    const userExist = await prisma.users.findUnique({
        where: {
            username: username, role: 'admin'
        }
    })

    if(!userExist) {
     return NextResponse.json({meter:null, message: 'You are not authorised to do this please'})
    }


    const meterExist = await prisma.meters.findUnique({
        where: {
            m_unique_id: meterid,  m_for: type
        }
    })

    if(!meterExist) {
     return NextResponse.json({meter:null, message: `Meter ID for ${type} not found in the database`})
    }

    const postMeterData = await prisma.meter_tanker_entries.create({
        data: {
            mt_unique_id: meterid, 
            mt_tankerid: tankerid || '',
            mt_delivery_rate: delivery_rate,
            mt_volume_delivered: parseInt(volume),
            mt_valve_state:valve_state,
            createdAt: new Date(),
        }
    })


    return NextResponse.json({meter: postMeterData, message: `Meter data successfully submitted for tanker meter with ID ${meterid}`})

   } catch(error) {

    return NextResponse.json({message: 'Failed to post tanker meter data', error})
   }
}