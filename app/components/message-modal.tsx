'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"


export default function MessageModal({children}: {children: React.ReactNode}) {

const searchParams = useSearchParams()
const pathname = usePathname()
const router = useRouter()
const {replace} = useRouter()
const messageRef = useRef<null | HTMLDialogElement>(null)
const showMessage = searchParams.get('showMessage')
const params = new URLSearchParams(searchParams)



useEffect(() => {
    if(showMessage === 'y') {
        messageRef.current?.showModal()
    } else {
        messageRef.current?.close()
    }
},[showMessage])



const dialog = showMessage === 'y' 
? (
<dialog ref={messageRef} className="fixed top-50 left-50 translate-x-50 translate-y-50 z-10 backdrop:bg-gray-800/50 rounded-xl">
    
    <div className="p-3">{children}</div>

</dialog>
)

: null

  return dialog
}
