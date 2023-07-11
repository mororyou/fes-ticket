import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { message } = req.body
    const CHANNEL_ID = process.env.NEXT_PUBLIC_DISCORD_CHANNEL_ID as string
    const token = process.env.NEXT_PUBLIC_DISCORD_BOT_TOKEN as string
    try {
      const response = await fetch(
        `https://discord.com/api/v9/channels/${CHANNEL_ID}/messages`,
        {
          method: 'POST',
          body: JSON.stringify({
            content: '新規申し込みがありました！',
          }),
          headers: {
            Authorization: `Bot ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      res.status(200).json({ success: true })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false })
    }
  } else {
    res.status(405).json({ success: false })
  }
}
