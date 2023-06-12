import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default function contact(req: NextApiRequest, res: NextApiResponse) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_GMAIL_USER,
      pass: process.env.NEXT_PUBLIC_GMAIL_PASS,
    },
  })

  //管理人が受け取るメール
  const toHostMailData = {
    from: 'libefes-ticket.com',
    to: `${req.body.email}`,
    subject: `【受付完了メール】受付が完了しました。`,
    text: req.body.name + ' | Sent from: ' + req.body.email,
    html: `
      <p>【お名前】</p>
      <p>${req.body.name}</p>
      <p>【リベシティ プロフィールURL】</p>
      <p>${req.body.url}</p>
      <p>【メールアドレス】</p>
      <p>${req.body.email}</p>
      <p>申し込み内容確認・キャンセルはこちら</p>
      <a href="${process.env.NEXT_PUBLIC_DOMAIN}/apply/complete/${req.body.uuid}">こちらから</a>
    `,
  }

  transporter.sendMail(toHostMailData, function (err: Error | null, info) {
    if (err) {
      console.log(`message : ${err.message}`)
      console.log(err)
      return
    }

    res.status(200).json({
      success: true,
      info: info,
    })
  })
}
