import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export type CurrencyForInput = {
    value: string;
    label: string;
}

export interface SupportedCurrenciesResponse {
    success: boolean;
    symbols: {
        [key: string]: string;
    };
}

export interface ExchangeRatesResponse {
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: {
        [currencyCode: string]: number;
    };
}
