import { NextResponse } from "next/server";
import { prisma } from "@/scripts";

export async function POST(req: Request) {
   try {
    const body = await req.json()

    const {area} = body

    console.log(area)

    const waterSold = await prisma.meter_domestic_entries.groupBy({
        by: ['md_area'],
        _sum: { md_volume_received: true },
        where: {md_area: area}
      })
      const arr: any = []
  
      waterSold.map((item, i) => {
        let areaArr = item.md_area?.split(' ')
        let initials = `${areaArr?.[0].charAt(0)}${areaArr?.[1].charAt(0)}`
        let newObj = { "name": initials, "qty": item._sum.md_volume_received }
  
        arr.push(newObj)
      })

    
      return NextResponse.json({data: arr})

   } catch(error) {

    return NextResponse.json({message: 'Failed to fetch water sold data', error})
   }
}
