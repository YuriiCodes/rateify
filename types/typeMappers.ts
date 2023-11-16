import {CurrencyForInput, SupportedCurrenciesResponse} from "@/types/index";

export const mapSupportedCurrencies = (backendData: SupportedCurrenciesResponse): string[] => {
    return Object.keys(backendData.symbols);
};

