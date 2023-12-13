import { NextResponse } from "next/server";
import { prisma } from "@/scripts";

export async function POST(req: Request) {
   try {
    const body = await req.json()

    const {role} = body

    const wateranalysis = await prisma.meter_supply_entries.findMany({
       orderBy: {createdAt: 'desc'},
       skip:0,
       take:1
    })

    if(!wateranalysis) {
     return NextResponse.json({data:null, message: 'No water Analysis data found.'})
    }

    return NextResponse.json({data: wateranalysis})

   } catch(error) {

    return NextResponse.json({message: 'Failed to fetch water Analysis data', error})
   }
}
