import { FaRedhat } from "react-icons/fa"

export function UserNumbersCard ({num, name}: {num: any, name: string}) {
    
        return (
        <div className="w-[200px] flex flex-col justify-center items-center mx-2 p-4 rounded-lg bg-slate-200 border-1 border-slate-300">
            <div className="flex text-4xl">{name}</div>
            <div className="w-full flex justify-around items-center">
            <h3 className="text-4xl font-bold">{num?.id}</h3>
            <FaRedhat className='text-5xl' />
           
            </div>
</div>
)
    
}