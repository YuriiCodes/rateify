import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Tooltip} from "@nextui-org/react";

import {CurrencyUniversalInput} from "@/components/currency-universal-input";
import {MdSwapCalls} from "react-icons/md"
import useSupportedCurrencies from "@/hooks/useSupportedCurrencies";
import {useMemo, useState} from "react";
import {mapSupportedCurrencies} from "@/types/typeMappers";
import useExchangeRates from "@/hooks/useExchageRates";


const INIT_BASE_CURR = "USD";

export const CurrencyExchangeTable = () => {
    const [amount, setAmount] = useState<number>(0);
    const [currency, setCurrency] = useState<string>(INIT_BASE_CURR);



    // fetching the list of supported currencies
    const {
        data: dataSupCurr
        , isLoading: isLoadingSupCurr, isError: isErrorSupCurr
    } = useSupportedCurrencies();

    // useMemo to transform the data only when 'data' changes
    const supportedCurrencyForInputs = useMemo(() => {
        return dataSupCurr ? mapSupportedCurrencies(dataSupCurr) : [];
    }, [dataSupCurr]);


    function roundToFour(num: number) {
        return Math.round(num * 10000) / 10000;
    }



    // fetching the exchange rates for base currency
    const {data: dataRates, isLoading: isLoadingRates, isError: isErrorRates} = useExchangeRates(currency);


    function handleAmount1Change(amount: number) {
        setAmount(amount);
    }

    function handleCurrency1Change(currency1: string) {
        setCurrency(currency1);
    }


    const conversions = useMemo(() => {
        if (!dataRates) return [];
        return Object.keys(dataRates.rates).map(currency => ({
            currency,
            value: (amount * dataRates.rates[currency]).toFixed(4),
        }));
    }, [amount, dataRates]);


    if (isLoadingSupCurr) return <div>loading supported currencies...</div>
    if (isErrorSupCurr) return <div>error supported currencies...</div>

    if (isLoadingRates) return <div>loading exchange rates...</div>
    if (isErrorRates) return <div>error exchange rates...</div>

    return (
        <Card className="py-4 w-1/2 flex">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                <h1 className="text-large uppercase font-bold">Currency Exchange</h1>
                <small className="text-default-500">Enter the amount and select the currency pair</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <CurrencyUniversalInput
                    amount={amount}
                    label={"Currency I want to sell"}
                    currency={currency}
                    onAmountChange={setAmount}
                    onCurrencyChange={setCurrency}
                    currencies={supportedCurrencyForInputs}/>

                <table>
                    {/* Header */}
                    <tbody>
                    {conversions.map(({currency, value}) => (
                        <tr key={currency}>
                            <td>{currency}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    )
}