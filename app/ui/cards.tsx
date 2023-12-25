import { FaRedhat } from "react-icons/fa"
import { FaShapes } from "react-icons/fa"
import { formatCurrency } from "../utils/utils"

export function UserNumbersCard ({num, name}: {num: any, name: string}) {
    
        return (
        <div className={`w-[200px] h-[150px] flex flex-col justify-between items-between mx-2 py-4 px-3 rounded-lg bg-slate-200 border-1 border-slate-300`}>
            <div className="flex items-center justify-center">{name === 'fleetownerdriver' ? 
            <div className="text-xl">Fleet Owners<p className="text-sm">Drivers</p></div> :
            name === 'fleetownerplumber' ?
            <div className="text-xl">Fleet Owners<p className="text-sm">Plumbers</p></div> :
            <div className="text-xl capitalize">{name}s</div>}</div>
            <div className="w-full flex justify-around items-center">
            <h3 className="text-4xl font-bold">{num?.id}</h3>
            <FaShapes className='text-5xl' />
            </div>
</div>
)
    
}

export function UserNumbersCardPlain ({num, name}: {num: number, name: string}) {
    
    return (
    <div className={`w-[200px] h-[120px] flex flex-col justify-between items-start mx-2 py-3 px-3 rounded-lg bg-white border-1 border-slate-300`}>
        <div className="flex items-center justify-center">
        <div className="text-xl">{name}</div>
        </div>
        <div className="w-full flex justify-start items-start">
        <h3 className="text-4xl font-bold">{num}</h3>
        </div>
</div>
)

}

export function ExpectedCommission ({title, amount}: {title: string, amount: number}) {

    const amountColor = title === 'total expected commission' ? 'text-green-400' : title === 'total received' ? 'text-blue-500' : 'text-red-500'
    
    return (
    <div className={`w-full h-[120px] flex flex-col justify-between items-start shadow-lg p-4 px-3 rounded-lg bg-white border-1 border-slate-300`}>
        <div className="flex items-center justify-center">
        <div className="text-2xl capitalize">{title}</div>
        </div>
        <div className="w-full flex justify-start items-start">
        <h3 className={`text-4xl font-bold ${amountColor}`}>{formatCurrency(amount)}</h3>
        </div>
</div>
)

}