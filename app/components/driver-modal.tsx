'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"


export default function DriverModal({children}: {children: React.ReactNode}) {

const searchParams = useSearchParams()
const pathname = usePathname()
const router = useRouter()
const dialogRef = useRef<null | HTMLDialogElement>(null)
const showDialog = searchParams.get('showDialog')
const userId = searchParams.get('user')

useEffect(() => {
    if(showDialog === 'y') {
        dialogRef.current?.showModal()
    } else {
        dialogRef.current?.close()
    }
},[showDialog])

const closeDialog = () => {
    dialogRef.current?.close()
    router.push('/account/vendor-merchants/drivers')
}

const clickOk = () => {
    closeDialog()
}

const dialog: JSX.Element | null = showDialog === 'y' 
? (
<dialog ref={dialogRef} className="fixed top-50 left-50 translate-x-50 translate-y-50 z-10 backdrop:bg-gray-800/50">
    
    <div className="p-3">{children}</div>
    <div className="flex justify-end p-2">
        <button className="bg-sky-400 text-white rounded text-sm px-2 py-1" onClick={clickOk}>Ok</button>
        </div>
</dialog>
)

: null

  return dialog
}
