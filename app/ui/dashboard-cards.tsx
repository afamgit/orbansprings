import CustomersPerArea from './charts/customers-per-area';
import DriversPerArea from './charts/drivers-per-area';
import WaterAnalysis from './charts/water-analysis';

export default async function DashboardCards() { 

      return (
        <main className='w-full mx-auto flex flex-col justify-start items-start'>

<div className='flex flex-col md:flex-row w-full justify-center gap-3 items-center my-3 mx-2 py-3'>
         <CustomersPerArea /> 
          <DriversPerArea />  
          <WaterAnalysis />
          </div>
 

        </main>
      )
}