// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const symbolsList = await axios.get(`${process.env.RATE_EXCHANGE_BACKEND_BASIC_URL}/symbols`, {
      params: {
        'access_key': process.env.RATE_EXCHANGE_API_KEY,
      }
    })
    return res.status(symbolsList.status).json(symbolsList.data)
  } catch (error: any) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
