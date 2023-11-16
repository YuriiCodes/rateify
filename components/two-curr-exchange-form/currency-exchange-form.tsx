import {Tooltip} from "@nextui-org/react";

import {CurrencyUniversalInput} from "@/components/universal-input/currency-universal-input";
import {MdSwapCalls} from "react-icons/md"
import useSupportedCurrencies from "@/hooks/useSupportedCurrencies";
import {useEffect, useMemo, useState} from "react";
import {mapSupportedCurrencies} from "@/types/typeMappers";
import useExchangeRates from "@/hooks/useExchageRates";
import {CurrencyExchangeCard} from "@/components/currency-exchange-card";
import {CurrencyExchangeFormLoading} from "@/components/two-curr-exchange-form/currency-exchange-form-loading";
import {ErrorExchangeCard} from "@/components/error-exchange-card";
import {useRouter} from "next/router";
import {toast} from "react-toastify";


const DEFAULT_BASE_CURRENCY = "EUR";

const INIT_SELL_CURRENCY = "USD";
const INIT_BUY_CURRENCY = "EUR";

const fromCurrencyNotSupportedToastId = "from-currency-not-supported-toast-id";
const toCurrencyNotSupportedToastId = "to-currency-not-supported-toast-id";
export const CurrencyExchangeForm = () => {
    const router = useRouter();
    const {query} = router;
    console.log(query)
    console.log("query.currencyFrom", query.currencyFrom)
    console.log("query.currencyTo", query.currencyTo)
    // sell, quote currency
    const [amount1, setAmount1] = useState<number>(0);
    const [currency1, setCurrency1] = useState<string>(query.currencyFrom as string || INIT_SELL_CURRENCY);
    console.log("currency1", currency1)


    // buy, base currency
    const [amount2, setAmount2] = useState<number>(0);
    const [currency2, setCurrency2] = useState<string>(query.currencyTo as string || INIT_BUY_CURRENCY);


    // fetching the list of supported currencies
    const {
        data: dataSupCurr,
        isLoading: isLoadingSupCurr,
        isError: isErrorSupCurr,
        refetch: refetchSupCurr,
        isFetching: isFetchingSupCurr,
    } = useSupportedCurrencies();


    // fetching the exchange rates for base currency
    const {
        data: dataRates,
        isLoading: isLoadingRates,
        isError: isErrorRates,
        refetch: refetchRates,
        isFetching: isFetchingRates,
    } = useExchangeRates(DEFAULT_BASE_CURRENCY);


    // useMemo to transform the data only when 'data' changes
    const supportedCurrencyForInputs = useMemo(() => {
        return dataSupCurr ? mapSupportedCurrencies(dataSupCurr) : [];
    }, [dataSupCurr]);


    const isCurrencySupported = (currencies: string[], currency: string) => {
        return currencies.length > 0 && currencies.includes(currency);
    }

    // Sync the query params with the state
    useEffect(() => {
        if(isLoadingSupCurr) return;

        if (query.currencyFrom) {
            if (!isCurrencySupported(supportedCurrencyForInputs, query.currencyFrom as string)) {
                console.log("supportedCurrencyForInputs", supportedCurrencyForInputs);
                console.log("query.currencyFrom", query.currencyFrom);
                setCurrency1(INIT_SELL_CURRENCY);
                toast.info(`That sell currency is not supported. We automatically changed it to ${INIT_SELL_CURRENCY}. Please select another one.`, {
                    toastId: fromCurrencyNotSupportedToastId,
                })
                return
            }
            setCurrency1(query.currencyFrom as string);
        }
        if (query.currencyTo) {
            if (!isCurrencySupported(supportedCurrencyForInputs, query.currencyTo as string)) {
                setCurrency2(INIT_BUY_CURRENCY);
                toast.info(`That buy currency is not supported. We automatically changed it to ${INIT_BUY_CURRENCY}. Please select another one.`, {
                    toastId: toCurrencyNotSupportedToastId,
                })
                return
            }
            setCurrency2(query.currencyTo as string);
        }
    }, [query.currencyFrom, query.currencyTo, supportedCurrencyForInputs, isLoadingSupCurr]);

    function roundToFour(num: number) {
        return Math.round(num * 10000) / 10000;
    }

    function handleSwap() {
        // Swap the currencies
        const tempCurrency = currency1;
        setCurrency1(currency2);
        setCurrency2(tempCurrency);

        // Swap the amounts
        // Note: You might want to recalculate the amounts based on the new currency pair
        // or simply swap the display values, depending on your requirements.
        const tempAmount = amount1;
        setAmount1(amount2);
        setAmount2(tempAmount);
    }

    function handleAmount1Change(amount1: number) {
        if (!dataRates) return;
        setAmount2(roundToFour(amount1 * dataRates.rates[currency2] / dataRates.rates[currency1]));
        setAmount1(amount1);
    }

    function handleCurrency1Change(currency1: string) {
        if (!dataRates) return;
        setAmount2(roundToFour(amount1 * dataRates.rates[currency2] / dataRates.rates[currency1]));
        setCurrency1(currency1);
        updateQueryParams(currency1, currency2);
    }

    function handleAmount2Change(amount2: number) {
        if (!dataRates) return;
        setAmount1(roundToFour(amount2 * dataRates.rates[currency1] / dataRates.rates[currency2]));
        setAmount2(amount2);
    }

    function handleCurrency2Change(currency2: string) {
        if (!dataRates) return;
        setAmount1(roundToFour(amount2 * dataRates.rates[currency1] / dataRates.rates[currency2]));
        setCurrency2(currency2);
        updateQueryParams(currency1, currency2);
    }

    // Update query params when currencies change
    const updateQueryParams = (newCurrencyFrom: string, newCurrencyTo: string) => {
        void router.push({
            pathname: router.pathname,
            query: {...query, currencyFrom: newCurrencyFrom, currencyTo: newCurrencyTo},
        }, undefined, {shallow: true});
    };

    if (isLoadingSupCurr || isLoadingRates) return <CurrencyExchangeFormLoading/>

    if (isErrorSupCurr) return <ErrorExchangeCard
        failedResource={"supported currencies"}
        refetch={refetchSupCurr}
        isFetching={isFetchingSupCurr}
    />

    if (isErrorRates) return <ErrorExchangeCard
        failedResource={"rates"}
        refetch={refetchRates}
        isFetching={isFetchingRates}

    />
    return (
        <CurrencyExchangeCard>
            <>
                <CurrencyUniversalInput
                    amount={amount1}
                    label={"Currency I want to sell: "}
                    currency={currency1}
                    onAmountChange={handleAmount1Change}
                    onCurrencyChange={handleCurrency1Change}
                    currencies={supportedCurrencyForInputs}/>
                <div className={"w-full flex justify-center my-5"}>
                    <Tooltip content="Swap currencies">
                        <button onClick={handleSwap}>
                            <MdSwapCalls size={48}/>
                        </button>
                    </Tooltip>
                </div>
                <CurrencyUniversalInput
                    amount={amount2}
                    label={"Currency I want to buy: "}
                    currency={currency2}
                    onAmountChange={handleAmount2Change}
                    onCurrencyChange={handleCurrency2Change}
                    currencies={supportedCurrencyForInputs}

                />
            </>
        </CurrencyExchangeCard>
    )
}