import { NextResponse } from "next/server";
import { prisma } from "@/scripts";
import { z } from "zod";

export async function POST(req: Request) {
   try {
    const body = await req.json()

    const {userid } = body

    const parsedCredentials = z
          .object({ userid: z.string() })
          .safeParse(body);

          if(!parsedCredentials.success) {
            return NextResponse.json({meter:null, message: 'Could not retrieve user details'})
          }

    const user = await prisma.users.findUnique({
        where: {
            id: parseInt(userid)
        },
        select: {id:true, commission_payment_ref:true, commissions_outstanding:true}
    })

    if(!user) {
     return NextResponse.json({meter:null, message: 'You are not authorised to do this please'})
    }

    const updateUser = await prisma.users.update({
        data: {
            commissions_outstanding: 0,
            isavailable: false,
            isavailable_by: '',
            isavailable_reason: '',
            updatedAt: new Date(),
        },
        where: {id: user.id}
    })

    return NextResponse.json({user: updateUser, msg: 'ok', message: `Driver successfully updated`})

   } catch(error) {

    return NextResponse.json({message: 'Failed to update driver and driver payment', error})
   }
}