import { prisma } from "@/scripts";
import { UserNumbersCardSingle } from "../ui/cards";

const UsersByNumbers = async () => {

  const totalUsers = await prisma.users.count({
    where: {NOT:{role: 'admin'}}
  })
  const totalCustomers = await prisma.users.count({
    where: {role: 'customer'}
  })    
  
  const totalDrivers = await prisma.users.count({
    where: {role: 'driver'}
  })    
  
  const totalVendors = await prisma.users.count({
    where: {OR:[{role: 'plumber'}, {role: 'tank cleaner'}]}
  })    

  const totalMerchants = await prisma.users.count({
    where: {OR:[{role: 'fleetownerdriver'}, {role: 'fleetownerplumber'}]}
  })

  return (
    <div className='w-full flex flex-wrap'>
    <UserNumbersCardSingle num={totalUsers} name='total user' />
      <UserNumbersCardSingle num={totalCustomers} name='customer' />
      <UserNumbersCardSingle num={totalDrivers} name='driver' />
      <UserNumbersCardSingle num={totalVendors} name='vendor' />
      <UserNumbersCardSingle num={totalMerchants} name='merchant' />

    </div>
);
};
export default UsersByNumbers;
