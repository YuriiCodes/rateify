// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import {ExchangeRatesResponse} from "@/types";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ExchangeRatesResponse>
) {
    const rates= await axios.get<any>(`${process.env.RATE_EXCHANGE_BACKEND_BASIC_URL}/latest`, {
        params: {
            'access_key': process.env.RATE_EXCHANGE_API_KEY,
            'base': req.query.base,
        }
    })
    res.status(rates.status).json(rates.data)
}
