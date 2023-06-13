import { FROM_MAIL_ADDRESS } from '@/constant/const'
import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

/**
 * スケジュール確定通知
 */
export default function notice(req: NextApiRequest, res: NextApiResponse) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_GMAIL_USER,
      pass: process.env.NEXT_PUBLIC_GMAIL_PASS,
    },
  })

  const mailData = {
    from: FROM_MAIL_ADDRESS,
    to: `${req.body.email}`,
    subject: ``,
    text: ``,
    html: ``,
  }

  transporter.sendMail(mailData, (err: Error | null, info) => {
    if (err) {
      console.log(`message: ${err.message}`)
      console.log(err)
      return
    }
    res.status(200).json({
      success: true,
      info: info,
    })
  })
}
