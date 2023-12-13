import { NextResponse } from "next/server";
import { prisma } from "@/scripts";

export async function POST(req: Request) {
   try {
    const body = await req.json()

    const {area} = body

    const driversPerArea = await prisma.users.groupBy({
        by: ['subscription_plan'],
        _count: {id:true},
        where: {
            area: area, role: 'driver'
        }
    })

    if(driversPerArea.length === 0) {
     return NextResponse.json({data:null, message: 'No drivers data found for this location'})
    }

    return NextResponse.json({data: driversPerArea})

   } catch(error) {

    return NextResponse.json({message: 'Failed to fetch drivers data', error})
   }
}
