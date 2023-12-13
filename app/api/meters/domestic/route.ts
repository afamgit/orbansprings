import { NextResponse } from "next/server";
import { prisma } from "@/scripts";
import { z } from "zod";

export async function POST(req: Request) {
   try {
    const body = await req.json()

    const {username, meterid, userid, type, consumption_rate, volume, valve_state } = body

    const parsedCredentials = z
          .object({ username: z.string(), meterid: z.string().min(9).max(10), type: z.string(), consumption_rate: z.string(), volume: z.string(), valve_state: z.string() })
          .safeParse(body);

          if(!parsedCredentials.success) {
            return NextResponse.json({meter:null, message: 'Please provide all the required information'})
          }

    const userExist = await prisma.users.findUnique({
        where: {
            username: username, role: 'admin' || 'iot'
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

    const postMeterData = await prisma.meter_domestic_entries.create({
        data: {
            md_unique_id: meterid, 
            md_userid: userid || '',
            md_area: meterExist?.m_area,
            md_consumption_rate: consumption_rate,
            md_volume_received: parseInt(volume),
            md_valve_state:valve_state,
            createdAt: new Date(),
        }
    })


    return NextResponse.json({meter: postMeterData, message: `Meter data successfully submitted for domestic meter with ID ${meterid}`})

   } catch(error) {

    return NextResponse.json({message: 'Failed to post domestic meter data', error})
   }
}