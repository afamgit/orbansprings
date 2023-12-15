import { NextResponse } from "next/server";
import { prisma } from "@/scripts";

export async function POST(req: Request) {
   try {
    const body = await req.json()

    const {role} = body

    const aveArr:any = []
    const arrLegend: any = []


    const aveWaitingTime = await prisma.transactions.groupBy({
      by: ['customerarea'],
      _avg: { customerwaittime: true },
      where: {AND:[{ customerdeliverystatus: 'delivered' }, { driverdeliverystatus: 'delivered'}]}
    })

    aveWaitingTime.map((item,i) => {
      
      let newObj = {"name": item.customerarea, "customerWait": item._avg.customerwaittime}
      aveArr.push(newObj)
    })

    const aveDeliveryTime = await prisma.transactions.groupBy({
      by: ['customerarea'],
      _avg: { driverdeliverytime: true },
      where: {AND:[{ customerdeliverystatus: 'delivered' }, { driverdeliverystatus: 'delivered'}]}
    })

   aveDeliveryTime.map((item,i) => {

      if(aveArr[i].name === item.customerarea) {
        aveArr[i]["driverDelivery"] = item._avg.driverdeliverytime

        let areaArr = item.customerarea?.split(' ')
        let first = areaArr?.[0].charAt(0)
        let second = areaArr?.[1]?.charAt(0) || areaArr?.[0].charAt(1)
        let initials = `${first}${second}`

        aveArr[i]["name"] = initials

  
        let legend = {"abb":initials, "name":item.customerarea}
  
        arrLegend.push(legend)
  
      }

    })

    return NextResponse.json({data: [aveArr, arrLegend]})

   } catch(error) {

    return NextResponse.json({message: 'Failed to fetch delivery time data', error})
   }
}
