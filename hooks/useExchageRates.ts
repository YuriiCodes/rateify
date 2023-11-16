import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_TIME, STALE_TIME } from "./cacheSettings";
import {ExchangeRatesResponse} from "@/types";

// we use Next.js API as a proxy to the rate exchange API,
// instead of calling the API directly from the client.
// we do this to hide the API key from the client.
const fetchLatestRates = async (base: string) => {
    const response = await axios.get<ExchangeRatesResponse>('/api/latest', {
        params: {
            'base': base,
        }
    });
    return response.data;
};



export default function useExchangeRates(base: string) {
    return useQuery({ queryKey: ['exchange-rates', base], queryFn: () => fetchLatestRates(base),
        ...{cacheTime: CACHE_TIME,
            staleTime: STALE_TIME,
            enabled: !!base,
        }});
}
