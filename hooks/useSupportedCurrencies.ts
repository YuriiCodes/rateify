import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_TIME, STALE_TIME } from "./cacheSettings";
import {SupportedCurrenciesResponse} from "@/types";

// we use Next.js API as a proxy to the rate exchange API,
// instead of calling the API directly from the client.
// we do this to hide the API key from the client.
const fetchSupportedCurrencies = async () => {
    const response = await axios.get<SupportedCurrenciesResponse>('/api/supported-currencies', {});
    return response.data;
};

export default function useSupportedCurrencies() {
    return useQuery({ queryKey: ['supported-currencies'], queryFn: fetchSupportedCurrencies,
    ...{cacheTime: CACHE_TIME, staleTime: STALE_TIME}});
}
