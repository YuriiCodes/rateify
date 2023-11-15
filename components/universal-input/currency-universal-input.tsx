import {Input,} from "@nextui-org/react";
import {CurrencyForInput} from "@/types";
import {ChangeEvent} from "react";


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

    const handleInputChange= (e:ChangeEvent<any> ) => {
        const value = e.target.value;
        console.log(value)
        if (value === "") {
            // If the input is empty, update the state with undefined
            onAmountChange(0);
            return;
        }
        onAmountChange(parseFloat(value));
    };

    return (
        <div>
            <p className="font-bold py-2">{label}</p>
            <div className="flex flex-col md:flex-row gap-5">
                <Input className={"w-full md:w-3/4"}
                       value={amount?.toString() || ""}
                       onChange={handleInputChange}
                       label={"Amount"}
                       step={0.01}
                       type="number" placeholder="0.00"/>
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