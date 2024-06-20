import { FaRedhat } from "react-icons/fa";
import { FaShapes } from "react-icons/fa";
import { BsFront } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import Image from "next/image";
import { formatCurrency } from "../utils/utils";

export function UserNumbersCard({ num, name }: { num: any; name: string }) {
  return (
    <div
      className={`w-[200px] h-[150px] flex flex-col justify-between items-between mx-2 py-4 px-3 rounded-lg bg-slate-200 border-1 border-slate-300`}
    >
      <div className="flex items-center justify-center">
        {name === "fleetownerdriver" ? (
          <div className="text-xl">
            Fleet Owners<p className="text-sm">Drivers</p>
          </div>
        ) : name === "fleetownerplumber" ? (
          <div className="text-xl">
            Fleet Owners<p className="text-sm">Plumbers</p>
          </div>
        ) : (
          <div className="text-xl capitalize">{name}s</div>
        )}
      </div>
      <div className="w-full flex justify-around items-center">
        <h3 className="text-4xl font-bold">{num?.id}</h3>
        <BsFront className="text-5xl" />
      </div>
    </div>
  );
}

export function UserNumbersCardSingle({
  num,
  name,
}: {
  num: any;
  name: string;
}) {

    const iconImage = name === "total user" ? (
        <Image
          src="/users_icon.png"
          height={72}
          width={72}
          alt={name}
          className="text-sm"
        />
    ) : name === "customer" ? (
        <Image src='/customers_icon.png' height={72} width={72} alt={name} className='rounded' />
    ) : name === "driver" ? (
        <Image
          src="/users_icon.png"
          height={72}
          width={72}
          alt={name}
          className="text-sm text-red-300"
        />
      ) : name === "total driver" ? (
        <Image
          src="/drivers_icon.png"
          height={72}
          width={72}
          alt={name}
          className="text-sm text-red-300"
        />      ) : name === "total truck" ? (
        <Image
          src="/trucks_icon.png"
          height={72}
          width={72}
          alt={name}
          className="text-sm text-red-300"
        />    ) : name === "vendor" ? (
        <Image
          src="/vendors_icon.png"
          height={72}
          width={72}
          alt={name}
          className="text-sm"
        />
    ) : (
        <Image
          src="/merchants_icon.png"
          height={72}
          width={72}
          alt={name}
          className="text-sm"
        />
    )

    const cardColor = name === "total user" ? 'bg-sky-100'
    : name === "total driver" ? 'bg-sky-100' 
    : name === "total truck" ? 'bg-lime-100' 
    : name === "customer" ? 'bg-lime-100' 
        : name === "driver" ? 'bg-sky-100' 
        : name === "vendor" ? 'bg-orange-100' 
        : name === "merchant" ? 'bg-red-100' 
        : ''


  return (

    <div
      className={`${(name === 'total driver' || name === 'total truck') ? 'w-[350px] h-[150px] px-8  m-2 justify-between items-between' : 'w-[200px] h-[120px] px-3 m-2 justify-between items-center'} flex flex-col justify-between items-between py-4 rounded-lg ${cardColor}`}
    >
      <div className="text-2xl capitalize font-bold">{name}s</div>
      <div className={`${(name === 'total driver' || name === 'total truck') ? "w-full flex justify-between px-20 items-center" : "w-full flex justify-center items-center"}`}>
        <h3 className="text-4xl font-bold mr-3">{num}</h3>
        {iconImage}
      </div>
    </div>
  );
}

export function UserNumbersCardPlain({
  num,
  name,
}: {
  num: number;
  name: string;
}) {
  const numColor =
  name === "orders completed"
      ? "text-sky-500"
      : name === "orders cancelled"
      ? "text-red-500"
            : "text-sky-500";

  return (
    <div
      className={`w-[200px] h-[120px] flex flex-col justify-between items-start mx-2 py-3 px-3 rounded-lg bg-white border-1 border-slate-300 shadow-lg`}
    >
      <div className="flex items-center justify-center">
        <div className="text-xl capitalize">{name}</div>
      </div>
      <div className="w-full flex justify-start items-start">
        <h3 className={`text-4xl font-bold ${numColor}`}>{num}</h3>
      </div>
    </div>
  );
}

export function DriverNumbersCard({
  num,
  name,
  percent
}: {
  num: number;
  name: string;
  percent: string
}) {

  const iconImage = name === "your drivers" ? (
    <Image
      src="/users_icon.png"
      height={72}
      width={72}
      alt={name}
      className="text-sm"
    />
) : (
    <Image
      src="/person_available.png"
      height={72}
      width={72}
      alt={name}
      className="text-sm"
    />
)

const cardColor = name === "your drivers" ? 'bg-sky-100'
: name === "available drivers" ? 'bg-lime-100' 
    : name === "unavailable drivers" ? 'bg-red-100' : ''

    const cardColorInner = name === "your drivers" ? 'bg-sky-300 flex justify-between items-center'
    : name === "available drivers" ? 'bg-lime-300 flex justify-start items-center' 
        : name === "unavailable drivers" ? 'bg-red-300 flex justify-start items-center' : ''


  return (
    <div
      className={`w-[350px] flex flex-col justify-between items-start m-3 py-4 px-6 rounded-lg ${cardColor} border-1 border-slate-300 shadow-lg`}
    >
      <div className={`w-full py-2 px-6 rounded-lg ${cardColorInner} `}>
      {name === "your drivers" ? (
    <Image
      src="/drivers.png"
      height={48}
      width={48}
      alt={name}
      className="text-sm rounded-lg"
    />
) : (
    <Image
      src="/person_available.png"
      height={48}
      width={48}
      alt={name}
      className="text-sm rounded-lg mr-2"
    />
)}
      <div className={`${name !== 'your drivers' && 'w-[90%]'}`}>
        <div className="flex items-center justify-start">
        <div className="capitalize">{name}</div>
      </div>
      <div className={`w-full flex justify-between items-center`}>
        <h3 className={`text-3xl font-bold`}>{num}</h3>
        {name !== 'your drivers' && <p>{`${percent}%`}</p>}
      </div>
      </div>
      </div>
    </div>
  );
}


export function ExpectedCommission({
  title,
  amount,
}: {
  title: string;
  amount: number;
}) {
  const amountColor =
    title === "total expected commission"
      ? "text-green-400"
      : title === "expected subscription revenue"
      ? "text-yellow-700"
      : title === "total received subscription"
      ? "text-lime-400": 
      title === "total received"
      ? "text-blue-500"
            : "text-red-500";

  return (
    <div
      className={`w-full h-[120px] flex flex-col justify-between items-start shadow-lg p-4 px-3 rounded-lg bg-white border-1 border-slate-300`}
    >
      <div className="flex items-center justify-center">
        <div className="text-2xl capitalize">{title}</div>
      </div>
      <div className="w-full flex justify-start items-start">
        <h3 className={`text-4xl font-bold ${amountColor}`}>
          {formatCurrency(amount)}
        </h3>
      </div>
    </div>
  );
}
