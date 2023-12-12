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

const ITEMS_PER_PAGE  = 15

export async function fetchFilteredMeterNumbers(
    query: string,
    currentPage: number,
  ) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
    try {
      const meterNums = await prisma.meter_numbers.findMany({
        skip:offset,
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
            skip:offset,
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
                skip:offset,
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
                  const meters = await prisma.contentpages.findMany({
                    skip:offset,
                    take: ITEMS_PER_PAGE
                  })
                  return meters;
                } catch (error) {
                  console.error('Database Error:', error);
                  throw new Error('Failed to fetch pages.');
                }
              }
              
              export async function fetchPages(query: string) {
                try {
                    const meters = await prisma.contentpages.count()
                    const totalPages = Math.ceil(Number(meters) / ITEMS_PER_PAGE);
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
                        skip:offset,
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
                            skip:offset,
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
                            const users = await prisma.users.count()
                            const totalPages = Math.ceil(Number(users) / ITEMS_PER_PAGE);
                            return totalPages;
                          } catch (error) {
                            console.error('Database Error:', error);
                            throw new Error('Failed to fetch users.');
                          }
                        }
                        