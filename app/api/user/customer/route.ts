import { NextResponse } from "next/server";
import { prisma } from "@/scripts";

export async function POST(req: Request, res: NextResponse) {
   try {
    const body = await req.json()

    const {area} = body

    const customersPerArea = await prisma.users.groupBy({
        by: ['subscription_plan'],
        _count: {id:true},
        where: {
            area: area, role: 'customer'
        }
    })

    if(customersPerArea.length === 0) {
     return NextResponse.json({data:null, message: 'No customers data found for this location'})
    }

    return NextResponse.json({data: customersPerArea})

   } catch(error) {

    return NextResponse.json({message: 'Failed to fetch customers data', error})
   }
}
