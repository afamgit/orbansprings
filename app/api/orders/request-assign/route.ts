import { NextResponse } from "next/server";
import { prisma } from "@/scripts";
import { z } from "zod";
import moment from "moment";

export async function POST(req: Request) {
   try {

    const body = await req.json()

    const {id, driver, transid, fleet, status, customer, commission } = body

    
        // return NextResponse.json({message: `${typeof id} - ${typeof driver} - ${typeof transid} - ${typeof fleet} ${typeof status}`})
       
        const userCustomer = await prisma.users.findUnique({
            where: {id: parseInt(customer)},
            select: {expotoken:true, id:true, name:true}
          })
    
          const userFleet = await prisma.users.findUnique({
            where: {id: parseInt(fleet)},
            select: {commissions_outstanding:true, id:true, name:true}
          })

    const user = await prisma.users.findUnique({
        where: {id: parseInt(driver)}
      })

    const order = await prisma.transactions.findFirst({
        where: {
            orderref: transid
        },
        select: {id:true, orderref:true, paymentstatus:true, status:true}
    })

    if(!user) {
        return NextResponse.json({status: 400, message: 'Could not retrieve driver details'})
       }

    if(!order) {
     return NextResponse.json({status: 400, message: 'You are not authorised to do this please'})
    }

    if(status !== 'pending') {
        return NextResponse.json({status: 400, message: 'The request is not a pending request.'})
       }

     
  
      const doUpdateRequest = await prisma.requests.update({
        where: {
          id: id, status: status
        },
        data: {
          driverid: user?.id,
          drivername: user?.name,
          driverphone: user?.phone,
          driveremail: user?.email,
          drivervehicleplateno: user?.drv_vehicle_license_plate_no,
          status: 'accepted',
          updatedAt: new Date()
        }
      })
  
      const doUpdateOrder = await prisma.transactions.update({
        where: {
          id: order?.id
        },
        data: {
          driverid: user?.id.toString(),
          drivername: user?.name,
          driverphone: user?.phone || '',
          driveremail: user?.email,
          driverphoto: user?.photo || '',
          drivervehicleplateno: user?.drv_vehicle_license_plate_no || '',
          fleetid: fleet,
          status: 'Accepted',
          updatedAt: new Date()
        }
      })

      const doUpdateDriver = await prisma.users.update({
        where: {
          id: parseInt(driver)
        },
        data: {
          isavailable: false,
          isavailable_by: 'Fleet owner',
          isavailable_reason: `Order #${transid} assigned to driver ${user?.name}`,
          updatedAt: new Date()
        }
      })

      const fleetCommission = userFleet?.commissions_outstanding + commission

     const doUpdateFleet = await prisma.users.update({
        where: {
          id: parseInt(fleet)
        },
        data: {
          commissions_outstanding: fleetCommission,
          updatedAt: new Date()
        }
      })

      const doUserMessages = await prisma.usermessages.create({
       
        data: {
          umsg_user: userCustomer?.name || '',
          umsg_body: `Your order #${transid} has been assigned to driver ${user?.name}`,
          umsg_cat: 'Notification',
          umsg_title: `Order #${transid} assigned`,
          umsg_sender: 'Orban Springs',
          umsg_time: new Date()
        }
      })

    return NextResponse.json({status: 200, token: userCustomer?.expotoken, message: `Order status successfully updated`})

   } catch(error) {

    return NextResponse.json({status: 400, message: 'Failed to update status for this request and order', error})
   }
}