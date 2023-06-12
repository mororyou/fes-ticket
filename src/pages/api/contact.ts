import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default function contact(req: NextApiRequest, res: NextApiResponse) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })
  //管理人が受け取るメール
  const toHostMailData = {
    from: `${req.body.email}`,
    to: 'libefes-ticket.com',
    subject: `【新規申し込み】${req.body.name}様より申し込みがありました`,
    text: req.body.name + ' | Sent from: ' + req.body.email,
    html: `
      <p>【お名前】</p>
      <p>${req.body.name}</p>
      <p>【リベシティ プロフィールURL】</p>
      <p>${req.body.url}</p>
      <p>【メールアドレス】</p>
      <p>${req.body.email}</p>
    `,
  }

  transporter.sendMail(toHostMailData, function (err, info) {
    if (err) console.log(err)
    else console.log(info)
  })
}
