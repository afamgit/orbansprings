import { NextResponse } from "next/server";
import { prisma } from "@/scripts";
import moment from "moment";

export async function POST(req: Request) {
   try {

    const body = await req.json()

    const {driver, transid, fleet, status, drivername, customer } = body

    
        // return NextResponse.json({message: `${typeof id} - ${typeof driver} - ${typeof transid} - ${typeof fleet} ${typeof status}`})
       


    const user = await prisma.users.findUnique({
        where: {id: parseInt(customer)},
        select: {expotoken:true, id:true, name:true}
      })

    const order = await prisma.transactions.findFirst({
        where: {
            orderref: transid
        },
        select: {id:true, orderref:true, status:true}
    })

    if(!user) {
        return NextResponse.json({status: 400, message: 'Could not retrieve customer details'})
       }

    if(!order) {
     return NextResponse.json({status: 400, message: 'You are not authorised to do this please'})
    }

  
      const doUpdateOrder = await prisma.transactions.update({
        where: {
          id: order?.id, orderref: transid, fleetid: fleet, status: 'Accepted'
        },
        data: {
          driverdeliverystatus: 'Delivered',
          driverdeliverystatustime: moment().format('YYYY-MM-DD HH:mma'),
          status: 'Completed',
          updatedAt: new Date()
        }
      })

      const doUpdateDriver = await prisma.users.update({
        where: {
          id: parseInt(driver)
        },
        data: {
          isavailable: true,
          isavailable_by: '',
          isavailable_reason: '',
          updatedAt: new Date()
        }
      })

      const title = `Order #${transid} completed`
      const message = `Your order #${transid} has been completed by ${drivername}`


      const doUserMessages = await prisma.usermessages.create({
       
        data: {
          umsg_user: user?.name,
          umsg_body: message,
          umsg_cat: 'Notification',
          umsg_title: title,
          umsg_sender: 'Orban Springs',
          umsg_time: new Date()
        }
      })


    return NextResponse.json({status: 200, token: user?.expotoken, pushTitle: title, pushBody: message, pushOrd: transid, message: `This Order has been completed by ${drivername}`})

   } catch(error) {

    return NextResponse.json({status: 400, message: 'Failed to update status for this order', error})
   }
}