import {Input,} from "@nextui-org/react";
import {CurrencyForInput} from "@/types";
import {ChangeEvent, useId} from "react";
import {toast} from "react-toastify";
import {useTranslation} from "next-i18next";

interface CurrencyUniversalInputProps {
    currencies: string[];
    currency: string;
    amount: number;
    label: string;

    onCurrencyChange: (currency: string) => void;
    onAmountChange: (amount: number) => void;
}

const toastLargeValueId = "toast-large-value-id";
export const CurrencyUniversalInput = ({
                                           currencies,
                                           currency,
                                           amount,
                                           label,
                                           onCurrencyChange,
                                           onAmountChange,
                                       }: CurrencyUniversalInputProps) => {
    const {t} = useTranslation()
    const id = useId()
    const handleInputChange = (e: ChangeEvent<any>) => {
        const value = e.target.value;
        if (value === "") {
            // If the input is empty, update the state with undefined
            onAmountChange(0);
            return;
        }
        // check the max value:
        if (value > Number.MAX_SAFE_INTEGER) {
            toast.error(t('toasts.error.valueTooBig'), {
                // pass the ID to avoid rendering large number of toasts.
                toastId: toastLargeValueId,
            })
            return;
        }
        onAmountChange(parseFloat(value));
    };

    return (
        <div>
            <label htmlFor={id} className="font-bold py-2">{label}</label>
            <div className="flex flex-col md:flex-row gap-5">
                <Input
                    id={id}
                    className={"currency-input w-full md:w-3/4"}
                    value={amount?.toString() || ""}
                    onChange={handleInputChange}
                    label={t("currencyExchangeCard.amount")}
                    step={0.01}
                    pattern={"[0-9]*"}
                    type="text" placeholder="0.00"/>
                <select
                    className="currency-select p-3 w-full md:w-1/4"
                    value={currency}
                    onChange={(e) => onCurrencyChange(e.target.value as string)}
                >
                    {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
        </div>)
}