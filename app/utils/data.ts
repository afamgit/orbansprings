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

export async function fetchMeterNumbers() {
    try {
        const allMeterNumbers = await prisma.meter_numbers.findMany()
        return allMeterNumbers;
    } 
 catch (error) {
  console.error('Database Error:', error);
  throw new Error('Failed to fetch meter numbers.');
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
    "Uwani","Maryland",
    "Old GRA",  "New GRA",  
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
