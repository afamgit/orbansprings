'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"


export default function VendorRequestModal({children}: {children: React.ReactNode}) {

const searchParams = useSearchParams()
const pathname = usePathname()
const router = useRouter()
const {replace} = useRouter()
const dialogRef = useRef<null | HTMLDialogElement>(null)
const showDialog = searchParams.get('showDialog')
const params = new URLSearchParams(searchParams)



useEffect(() => {
    if(showDialog === 'y') {
        dialogRef.current?.showModal()
    } else {
        dialogRef.current?.close()
    }
},[showDialog])


const closeDialog = () => {
    dialogRef.current?.close()
    params.delete('showDialog')
    replace(`${pathname}?${params.toString()}`)

    // router.push('/account/vendor-merchants/requests')
}

const clickOk = () => {
    closeDialog()
}

const dialog = showDialog === 'y' 
? (
<dialog ref={dialogRef} className="fixed top-50 left-50 translate-x-50 translate-y-50 z-10 backdrop:bg-gray-800/50 rounded-xl">
    
    <div className="p-3">{children}</div>
    <div className="flex justify-end p-2">
        <button className="bg-sky-400 text-white rounded text-sm px-2 py-1" onClick={clickOk}>Ok</button>
        </div>
</dialog>
)

: null

  return dialog
}
