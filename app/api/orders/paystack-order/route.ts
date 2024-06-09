import { NextResponse } from "next/server";
import { prisma } from "@/scripts";
import { z } from "zod";
import moment from "moment";

export async function POST(req: Request) {
   try {
    const body = await req.json()

    const {orderref } = body

    const parsedCredentials = z
          .object({ orderref: z.string() })
          .safeParse(body);

          if(!parsedCredentials.success) {
            return NextResponse.json({meter:null, message: 'Could not retrieve user details'})
          }

    const order = await prisma.transactions.findFirst({
        where: {
            orderref: orderref
        },
        select: {id:true, orderref:true, paymentstatus:true}
    })

    if(!order) {
     return NextResponse.json({meter:null, message: 'You are not authorised to do this please'})
    }

    if(order.paymentstatus === 'Paid') {
        return NextResponse.json({meter:null, message: 'The payment status for this order is Paid. This has been successfully processed before now.'})
       }

    const updateOrder = await prisma.transactions.update({
        data: {
            paymentstatus: 'Paid',
            paymenttime: moment(new Date()).format('YYYY-MM-DD HH:mma')
        },
        where: {id: order.id, orderref: order.orderref}
    })

    return NextResponse.json({msg: 'ok', message: `Order payment successfully updated`})

   } catch(error) {

    return NextResponse.json({message: 'Failed to update payment for this order', error})
   }
}