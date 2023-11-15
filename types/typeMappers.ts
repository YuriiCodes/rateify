import {CurrencyForInput, SupportedCurrenciesResponse} from "@/types/index";

export const mapSupportedCurrencies = (backendData: SupportedCurrenciesResponse): CurrencyForInput[] => {
    return Object.keys(backendData.symbols).map((currencyCode) => ({
        value: currencyCode,
        label: currencyCode,
    }));
}
