import { FROM_MAIL_ADDRESS } from '@/constant/const'
import { NextApiRequest, NextApiResponse } from 'next'
import * as ReactDOMServer from 'react-dom/server'
import nodemailer from 'nodemailer'
import { NoticeBody } from './body/notice'

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

  const body = NoticeBody(req.body)
  const msgBody = ReactDOMServer.renderToString(body)
  const message = `
    <html lang="ja">
      <head>
        <meta name="viewport" content="target-densitydpi=device-dpi,width=device-width,maximum-scale=1.0,user-scalable=yes"/>
        <meta http-equiv="Content-Language" content="ja"/>
        <meta charset="UTF-8"/>
        <title>【ITお悩み相談by福岡クリエイターズ】ご予約が確定しました</title>
      </head>
      <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="width: 100%;font-size: 14px;font-family: Hiragino Sans, Hiragino Kaku Gothic ProN, Meiryo, Osaka, sans-serif;color: #323333">
        ${msgBody}
      </body>
    </html>`

  const mailData = {
    from: FROM_MAIL_ADDRESS,
    to: `${req.body.schedule.email}`,
    subject: `【ITお悩み相談by福岡クリエイターズ】ご予約が確定しました`,
    text: ``,
    html: message,
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
