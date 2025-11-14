'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"


export default function Modal({title, onClose, onOk, children}: {title: string, onClose: () => void, onOk: () => void, children: React.ReactNode}) {

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
    onClose()
    router.push('/account/users')
}

const clickOk = () => {
    onOk()
    closeDialog()
}

const dialog = showDialog === 'y' 
? (
<dialog ref={dialogRef} className="fixed top-50 left-50 translate-x-50 translate-y-50 z-10 backdrop:bg-gray-800/50">
    <div className="w-full flex justify-between items-center bg-yellow-500 p-1">
        {title}
        <button className="bg-red-600 rounded text-white text-sm px-2 py-1" onClick={closeDialog}>X</button>
    </div>
    <div className="p-3">{children}</div>
    <div className="flex justify-end p-1">
        <button className="bg-green-700 text-white rounded text-sm px-2 py-1" onClick={clickOk}>Ok</button>
        </div>
</dialog>
)

: null

  return dialog
}
