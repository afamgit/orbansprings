import { NextResponse } from "next/server";
import { prisma } from "@/scripts";

export async function POST(req: Request) {

    function addOneYear(date: Date) {
        date.setFullYear(date.getFullYear() + 1);
        return date;
      }
      
   try {
    const body = await req.json()

    const {id, subType} = body

    const userMsg = subType === 'Basic' ? 'downgraded to Basic' : 'upgraded to Premium'

    const doUpgrade = await prisma.users.update({
        where: {
            id: parseInt(id), role: 'customer'
        },
        data: {subscription_plan: subType}
    })

    if(subType === 'Premium') {
        const user = await prisma.users.findUnique({
            where: {id: parseInt(id)},
            select: {username:true, area: true}
        })



            if(user) {
                const todayDate = new Date()

                const updateSubscriptions = await prisma.subscriptions.create({
                    data: {
                        subplantype: subType, 
                        subplanusername: user?.username,
                        subplanamt: 5000,
                        subplan_from: new Date(),
                        subplan_to: addOneYear(new Date()),
                        subplan_status: 'Active',
                        subplan_pay_status: 'Paid',
                        subplan_area: user?.area || '',
                        subplan_admin: 'admin',
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                })
            }
    
    }

    if(!doUpgrade) {
     return NextResponse.json({message: `Customer subscription plan could not be ${userMsg}`})
    }

    return NextResponse.json({message: `Customer subscription plan has been ${userMsg}`})

   } catch(error) {

    return NextResponse.json({message: 'Failed to upgrade customer subscription plan', error})
   }
}
