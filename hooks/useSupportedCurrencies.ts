import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_TIME, STALE_TIME } from "./cacheSettings";
import {SupportedCurrenciesResponse} from "@/types";

const fetchSupportedCurrencies = async () => {
    const response = await axios.get<SupportedCurrenciesResponse>('/api/supported-currencies', {});
    return response.data;
};

export default function useSupportedCurrencies() {
    return useQuery({ queryKey: ['supported-currencies'], queryFn: fetchSupportedCurrencies,
    ...{cacheTime: CACHE_TIME, staleTime: STALE_TIME}});
}
