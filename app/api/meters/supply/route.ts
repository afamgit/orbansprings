import { NextResponse } from "next/server";
import { prisma } from "@/scripts";
import { z } from "zod";

export async function POST(req: Request) {
   try {
    const body = await req.json()

    const {username, meterid, userid, type, supply_rate, temperature_c, temperature_f, turbidity, ph_level, volume, valve_state } = body

    const parsedCredentials = z
          .object({ username: z.string(), meterid: z.string().min(9).max(10), userid: z.string(),  type: z.string(), supply_rate: z.string(),  temperature_c: z.string(),  temperature_f: z.string(),  turbidity: z.string(),  ph_level: z.string(), volume: z.string(), valve_state: z.string() })
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
            m_unique_id: meterid, m_for: type
        }
    })

    if(!meterExist) {
     return NextResponse.json({meter:null, message: `Meter ID  for ${type} not found in the database`})
    }

    const postMeterData = await prisma.meter_supply_entries.create({
        data: {
            ms_unique_id: meterid, 
            ms_userid: userid || '',
            ms_supply_rate: supply_rate,
            ms_volume_supplied: parseInt(volume),
            ms_temperature_c: temperature_c,
            ms_temperature_f: temperature_f,
            ms_turbidity_level: turbidity,
            ms_ph_level: ph_level,
            ms_valve_state:valve_state,
            createdAt: new Date(),
        }
    })


    return NextResponse.json({meter: postMeterData, message: `Meter data successfully submitted for supply meter with ID ${meterid}`})

   } catch(error) {

    return NextResponse.json({message: 'Failed to post supply meter data', error})
   }
}