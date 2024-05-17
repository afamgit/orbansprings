import { NextResponse, NextRequest } from 'next/server'
const nodemailer = require('nodemailer');

// Handles POST requests to /api

export async function POST(req: Request) {
    const username = process.env.EMAIL_USERNAME;
    const password = process.env.EMAIL_PASSWORD;
    const myEmail = process.env.PERSONAL_EMAIL;
    const host = process.env.HOST;

    const formData = await req.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const subject = formData.get('subject')
    const message = formData.get('message')

    const transporter = nodemailer.createTransport({
        sendmail: true,
  newline: 'unix',
  host: host,
  port: 465,
//   port: 587,
  secure: false,
  auth: {
    user: username,
    pass: password
  },
  tls:{
    rejectUnauthorized:false  // if on local
  }
    });

    try {

        const mail = await transporter.sendMail({
            from: username,
            to: myEmail,
            replyTo: email,
            subject: `Heels and Key meessage from ${email}`,
            html: `
            <p>Name: ${name} </p>
            <p>Email: ${email} </p>
            <p>Phone: ${phone} </p>
            <p>Subject: ${subject} </p>
            <p>Message: ${message} </p>
            `,
        })

        return NextResponse.json({ message: "Success: email was sent" })

    } catch (error) {
        console.log(error)
        NextResponse.json({ message: "COULD NOT SEND MESSAGE" })
    }

  }