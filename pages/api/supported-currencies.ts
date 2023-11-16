// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import {SupportedCurrenciesResponse} from "@/types";


// we use Next.js API as a proxy to the rate exchange API.
// we do this to hide the API key from the client.
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SupportedCurrenciesResponse>
) {
    const rates= await axios.get<any>(`${process.env.RATE_EXCHANGE_BACKEND_BASIC_URL}/symbols`, {
        params: {
            'access_key': process.env.RATE_EXCHANGE_API_KEY,
        }
    })
    res.status(rates.status).json(rates.data)
}
