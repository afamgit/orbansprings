import { NextResponse } from 'next/server'
import { prisma } from "@/scripts";

// Handles POST requests to /api

export async function POST(req: Request) {

  const body = await req.json()

  const {name, email, phone, subject, message } = body

  console.log(`${subject} and ${name}`)

    try {

      const createMessage = await prisma.contact_messages.create({
        data: {
          cname: name,
          cemail: email,
          cphone: phone,
          csubject: subject,
          cmessage: message,
          cstatus: 'Open',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })

      if(!createMessage) {
       return NextResponse.json({ status: 400, message: "Could not send message" })
      }

        return NextResponse.json({ status: 200, message: "Message sent" })

    } catch (error) {
        console.log(error)
      return  NextResponse.json({ status: 400, message: "Could not send message" })
    }

  }