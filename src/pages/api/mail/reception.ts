import { FROM_MAIL_ADDRESS } from '@/constant/const'
import { NextApiRequest, NextApiResponse } from 'next'
import * as ReactDOMServer from 'react-dom/server'
import nodemailer from 'nodemailer'
import { ReceptionBody } from './body/reception'

/**
 * 申し込み完了メール通知API
 */
export default function reception(req: NextApiRequest, res: NextApiResponse) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_GMAIL_USER,
      pass: process.env.NEXT_PUBLIC_GMAIL_PASS,
    },
  })

  const body = ReceptionBody(req.body)
  const msgBody = ReactDOMServer.renderToString(body)

  const message = `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html  xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=iso-2022-jp">
      <meta name="viewport" content="width=device-width" />
      <title>Title</title>

      <style>
        body {
          width: 100% !important;
          min-width: 100%;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          margin: 0;
          padding: 0;
        }

        table {
          border-spacing: 0;
          border-collapse: collapse;
        }

        td {
          word-wrap: break-word;
          -webkit-hyphens: auto;
          -moz-hyphens: auto;
          hyphens: auto;
          border-collapse: collapse !important;
        }

        table, tr,
          td {
          padding: 0;
          vertical-align: top;
          text-align: left;
        }

        img {
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
          width: auto;
          clear: both;
          display: block;
        }
        a {
          img {
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
            width: auto;
            clear: both;
            display: block;
            border: none;
          }
        }

        /* =========================================================
        outlook対策
        ========================================================= */

        #outlook a {
          padding: 0;
        }

        body.outlook p {
          display: inline !important;
        }

        /* =========================================================
        ホットメールで画面いっぱいに表示ようにする
        ========================================================= */

        .ReadMsgBody {
          width: 100%;
        }
        .ExternalClass{
          width:100%;
        }

        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div{
          line-height: 100%;
        }

        #backgroundTable {
          margin: 0;
          Margin: 0;
          padding: 0;
          width: 100% !important;
          line-height: 100% !important;
        }
      </style>
    </head>
    <body>
        ${msgBody}
    </body>
    </html>`

  const toMails = []
  toMails.push(req.body.email)
  toMails.push('m.ryousuke0401@gmail.com')

  const mailOption = {
    from: FROM_MAIL_ADDRESS,
    to: toMails,
    subject: `【ITお悩み相談by福岡クリエイターズ】受付が完了しました。`,
    text: req.body.name + ' | Sent from: ' + req.body.email,
    html: message,
  }

  transporter.sendMail(mailOption, (err: Error | null, info) => {
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
