import { prisma } from '@/scripts'
import { createHash } from "crypto";

export async function getUser(email: string) {

  try {
    const user = await prisma.users.findMany();

    return user;
  } catch (error: any) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fecth user')
  }
}


export async function fetchCustomers() {
  try {
    const allCustomers = await prisma.users.findMany({
      where: {
        role: 'customer'
      },
      select: {
        username: true,
        name: true
      }
    })

    return allCustomers;
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}

export async function fetchDrivers() {
  try {
    const allDrivers = await prisma.users.findMany({
      where: {
        role: 'driver'
      }
    })
    return allDrivers;
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch drivers.');
  }
}

export async function fetchFleetDrivers() {
  try {
    const allVendors = await prisma.users.findMany({
      where: {
        role: 'fleetownerdriver'
      }
    })
    return allVendors;
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch fleet owner drivers.');
  }
}


export const pageCategories = [
  'General', 'About', 'Top', 'Partners', 'Services'
]

export const areas = [
  "New Heaven",
  "Independence Layout",
  "Thinkers Corner",
  "Uwani", "Maryland",
  "Old GRA", "New GRA",
  "Golf Centenary",
  "Ugwuaji",
  "Okpara Avenue",
  "New Layout",
  "Trans Ekulu",
  "Emene",
  "Abakpa",
  "Achara Layout",
  "Coal Camp",
  "Premier Layout",
  "Amechi/Topland",
  "Agbani Road/Garriki"

]

const ITEMS_PER_PAGE = 15

export async function fetchFilteredMeterNumbers(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const meterNums = await prisma.meter_numbers.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE
    })
    return meterNums;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch meter numbers.');
  }
}

export async function fetchMeterNumbers(query: string) {
  try {
    const meterNums = await prisma.meter_numbers.count()
    const totalPages = Math.ceil(Number(meterNums) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch meter numbers.');
  }
}

export async function fetchFilteredMeters(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const meters = await prisma.meters.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE
    })
    return meters;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch meters.');
  }
}

export async function fetchMeters(query: string) {
  try {
    const meters = await prisma.meters.count()
    const totalPages = Math.ceil(Number(meters) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch meters.');
  }
}

export async function fetchFilteredTeams(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const meters = await prisma.team_members.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE
    })
    return meters;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch teams.');
  }
}

export async function fetchTeams(query: string) {
  try {
    const meters = await prisma.team_members.count()
    const totalPages = Math.ceil(Number(meters) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch teams.');
  }
}

export async function fetchFilteredPages(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const pages = await prisma.contentpages.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE
    })
    return pages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pages.');
  }
}

export async function fetchPages(query: string) {
  try {
    const pages = await prisma.contentpages.count()
    const totalPages = Math.ceil(Number(pages) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pages.');
  }
}


export async function fetchFilteredTestimonials(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const meters = await prisma.testimonials.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE
    })
    return meters;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch testimonials.');
  }
}

export async function fetchTestimonials(query: string) {
  try {
    const meters = await prisma.testimonials.count()
    const totalPages = Math.ceil(Number(meters) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch testimonials.');
  }
}

export async function fetchFilteredUsers(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await prisma.users.findMany({
      where: {AND:[{role: 'customer' }, {OR:[{name: {contains:query}},{email:{contains: query}}, {phone: {contains: query}},{username:{contains:query}}]}]},
      skip: offset,
      take: ITEMS_PER_PAGE
    })
    return users;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchUsers(query: string) {
  try {
    const users = await prisma.users.count({
      where: { role: 'customer' }
    })
    const totalPages = Math.ceil(Number(users) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}


export async function fetchFilteredDrivers(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await prisma.users.findMany({
      where: {AND:[{role: 'driver' }, {OR:[{name: {contains:query}},{email:{contains: query}}, {phone: {contains: query}},{username:{contains:query}},{drv_vehicle_license_plate_no: {contains: query}}]}]},
      skip: offset,
      take: ITEMS_PER_PAGE
    })
    return users;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch drivers.');
  }
}

export async function fetchUserDrivers(query: string) {
  try {
    const users = await prisma.users.count({
      where: { role: 'driver' }
    })
    const totalPages = Math.ceil(Number(users) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch drivers.');
  }
}

export async function fetchFilteredVendors(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const vendors = await prisma.users.findMany({
      where: {AND: [{OR:[{role: 'plumber' }, {role: 'tank cleaner'}]}, {OR:[{name: {contains:query}},{email:{contains: query}}, {phone: {contains: query}},{username:{contains:query}}]}]},
      skip: offset,
      take: ITEMS_PER_PAGE
    })
    return vendors;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch vendors.');
  }
}


export async function fetchVendors(query: string) {
  try {
    const vendors = await prisma.users.count({
      where: {OR:[{role: 'plumber'}, {role: 'tank cleaner'}]}
    })
    const totalPages = Math.ceil(Number(vendors) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch vendors.');
  }
}

export async function fetchUserVendors(query: string) {
  try {
    const vendors = await prisma.users.count({
      where: {OR:[{role: 'plumber'}, {role: 'tank cleaner'}]}
    })
    const totalPages = Math.ceil(Number(vendors) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch vendors.');
  }
}

export async function fetchFilteredMerchants(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await prisma.users.findMany({
      where: {AND: [{OR:[{ role: 'fleetownerdriver' }, { role: 'fleetownerplumber' }]}, {OR:[{name: {contains:query}},{email:{contains: query}}, {phone: {contains: query}},{username:{contains:query}}]}]},
      skip: offset,
      take: ITEMS_PER_PAGE
    })
    return users;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch merchants.');
  }
}

export async function fetchUserMerchants(query: string) {
  try {
    const users = await prisma.users.count({
      where: { OR: [{ role: 'fleetownerdrivers' }, { role: 'fleetownerplumber' }] }
    })
    const totalPages = Math.ceil(Number(users) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch merchants.');
  }
}


export async function fetchFilteredCommissions(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const commissions = await prisma.transactions.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE
    })
    return commissions;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch commissions.');
  }
}

export async function fetchCommissions(query: string) {
  try {
    const commissions = await prisma.transactions.count()
    const totalPages = Math.ceil(Number(commissions) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch commissions.');
  }
}


export async function fetchFilteredComplaints(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const complaints = await prisma.contact_messages.findMany({
      orderBy: {createdAt: 'desc'},
      skip: offset,
      take: ITEMS_PER_PAGE
    })
    return complaints;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch complaints.');
  }
}

export async function fetchComplaints(query: string) {
  try {
    const complaints = await prisma.contact_messages.count()
    const totalPages = Math.ceil(Number(complaints) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch complaints.');
  }
}



export async function fetchFilteredNotifications(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const notifications = await prisma.usermessages.findMany({
      where: {NOT:{umsg_cat: 'Announcement'}},
      orderBy: {umsg_time: 'desc'},
      skip: offset,
      take: ITEMS_PER_PAGE
    })
    return notifications;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch notifications.');
  }
}

export async function fetchNotifications(query: string) {
  try {
    const notifications = await prisma.usermessages.count()
    const totalPages = Math.ceil(Number(notifications) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch notifications.');
  }
}


export async function fetchCustomersPerArea(location: string) {
  console.log('from fetch', location)

  try {
    const customers = await prisma.users.groupBy({
      by: ['subscription_plan'],
      _count: { id: true },
      where: {
        area: location, role: 'customer'
      }
    })
    console.log('from fetch', customers)
    return customers
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}

export async function fetchDriversPerArea(area: string) {
  try {
    const drivers = await prisma.users.groupBy({
      by: ['subscription_plan'],
      _count: { id: true },
      where: { role: 'driver' }
    })
    return drivers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch drivers.');
  }
}

export async function fetchWaterAnalysis() {
  try {
    const waterAnalysis = await prisma.meter_supply_entries.findMany({
      orderBy: { createdAt: 'desc' },
      skip: 0,
      take: 1
    })
    return waterAnalysis;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch water analysis.');
  }
}

export async function fetchAllProducts() {
  try {
    const products = await prisma.products.findMany()
    return products;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function fetchLatestCustomers() {
  try {
    const recentCustomers = await prisma.users.findMany({
      where: { role: 'customer' },
      orderBy: { createdAt: 'desc' },
      skip: 0,
      take: 10
    })
    return recentCustomers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recent customers.');
  }
}


export async function fetchFilteredFaqs(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const faqs = await prisma.faqs.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE
    })
    return faqs;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch questions.');
  }
}

export async function fetchFaqs(query: string) {
  try {
    const faqs = await prisma.faqs.count()
    const totalPages = Math.ceil(Number(faqs) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch questions.');
  }
}


export async function fetchAreaInfo() {
  try {
    const waterSold = await prisma.meter_domestic_entries.groupBy({
      by: ['md_area'],
      _sum: { md_volume_received: true }
    })
    const arr: any = []
    const arrLegend: any = []

    waterSold.map((item, i) => {
      let areaArr = item.md_area?.split(' ')
      let initials = `${areaArr?.[0].charAt(0)}${areaArr?.[1].charAt(0)}`
      let newObj = { "name": initials, "qty": item._sum.md_volume_received }

      arr.push(newObj)
    })

    waterSold.map((item, i) => {
      let areaArr = item.md_area?.split(' ')
      let initials = `${areaArr?.[0].charAt(0)}${areaArr?.[1].charAt(0)}`

      let legend = {"abb":initials, "name":item.md_area}

      arrLegend.push(legend)
    })

    return [arr,arrLegend]
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch area data.');
  }
}


export async function fetchAverageDeliveryTime() {
  try {
    const aveArr:any = []
    const arrLegend: any = []


    // const deliveries = await prisma.transactions.findMany({
    //   where: {AND:[{customerdeliverystatus: 'delivered'}, {driverdeliverystatus: 'delivered'}]},
    //   select: {
    //     id:true, customerdeliverystatus:true, customerwaittime:true, driverdeliverystatus:true, driverdeliverytime:true, customerarea:true
    //   }
    // })


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


    return [aveArr, arrLegend];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch average delivery time.');
  }
}