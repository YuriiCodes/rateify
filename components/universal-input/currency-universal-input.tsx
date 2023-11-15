import {Input,} from "@nextui-org/react";
import {CurrencyForInput} from "@/types";


interface CurrencyUniversalInputProps {
    currencies: CurrencyForInput[];
    currency: string;
    amount: number;
    label: string;

    onCurrencyChange: (currency: string) => void;
    onAmountChange: (amount: number) => void;
}

export const CurrencyUniversalInput = ({
                                           currencies,
                                           currency,
                                           amount,
                                           label,
                                           onCurrencyChange,
                                           onAmountChange,
                                       }: CurrencyUniversalInputProps) => {
    return (
        <div>
            <p className="font-bold py-2">{label}</p>
            <div className="flex flex-col md:flex-row gap-5">
                <Input className={"w-full md:w-3/4"}
                       value={amount?.toString() || ""}
                       onChange={(e) => onAmountChange(parseFloat(e.target.value))}
                       label={"Amount"} type="number" placeholder="0.00"/>
                <select

                    className="p-3 w-full md:w-1/4"
                    value={currency}
                    onChange={(e) => onCurrencyChange(e.target.value as string)}
                >
                    {currencies.map((currency) => (
                        <option key={currency.value} value={currency.value}>
                            {currency.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>)
}