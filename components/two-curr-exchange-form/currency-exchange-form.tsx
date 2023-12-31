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
import {useTranslation} from "next-i18next";



const DEFAULT_BASE_CURRENCY = "EUR";

const INIT_SELL_CURRENCY = "USD";
const INIT_BUY_CURRENCY = "EUR";

const fromCurrencyNotSupportedToastId = "from-currency-not-supported-toast-id";
const toCurrencyNotSupportedToastId = "to-currency-not-supported-toast-id";
export const CurrencyExchangeForm = () => {
    const {t} = useTranslation();
    const router = useRouter();
    const {query} = router;
    // sell, quote currency
    const [amountCurrencyToSell, setAmountCurrencyToSell] = useState<number>(0);
    const [currencyToSell, setCurrencyToSell] = useState<string>(query.currencyFrom as string || INIT_SELL_CURRENCY);


    // buy, base currency
    const [amountCurrencyToBuy, setAmountCurrencyToBuy] = useState<number>(0);
    const [currencyToBuy, setCurrencyToBuy] = useState<string>(query.currencyTo as string || INIT_BUY_CURRENCY);


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
                setCurrencyToSell(INIT_SELL_CURRENCY);
                toast.info(t('toasts.info.unsupportedSellCurrency'), {
                    toastId: fromCurrencyNotSupportedToastId,
                })
                return
            }
            setCurrencyToSell(query.currencyFrom as string);
        }
        if (query.currencyTo) {
            if (!isCurrencySupported(supportedCurrencyForInputs, query.currencyTo as string)) {
                setCurrencyToBuy(INIT_BUY_CURRENCY);
                toast.info(t('toasts.info.unsupportedBuyCurrency'), {
                    toastId: toCurrencyNotSupportedToastId,
                })
                return
            }
            setCurrencyToBuy(query.currencyTo as string);
        }
    }, [query.currencyFrom, query.currencyTo, supportedCurrencyForInputs, isLoadingSupCurr]);

    function roundToFour(num: number) {
        return Math.round(num * 10000) / 10000;
    }

    function handleSwap() {
        // Swap the currencies
        const tempCurrency = currencyToSell;
        setCurrencyToSell(currencyToBuy);
        setCurrencyToBuy(tempCurrency);

        // Swap the amounts
        // Note: You might want to recalculate the amounts based on the new currency pair
        // or simply swap the display values, depending on your requirements.
        const tempAmount = amountCurrencyToSell;
        setAmountCurrencyToSell(amountCurrencyToBuy);
        setAmountCurrencyToBuy(tempAmount);

        //update the query params:
        updateQueryParams(currencyToBuy, currencyToSell);
    }

    function handleAmount1Change(amount1: number) {
        if (!dataRates) return;
        setAmountCurrencyToBuy(roundToFour(amount1 * dataRates.rates[currencyToBuy] / dataRates.rates[currencyToSell]));
        setAmountCurrencyToSell(amount1);
    }

    function handleCurrency1Change(currency1: string) {
        if (!dataRates) return;
        setAmountCurrencyToBuy(roundToFour(amountCurrencyToSell * dataRates.rates[currencyToBuy] / dataRates.rates[currency1]));
        setCurrencyToSell(currency1);
        updateQueryParams(currency1, currencyToBuy);
    }

    function handleAmount2Change(amount2: number) {
        if (!dataRates) return;
        setAmountCurrencyToSell(roundToFour(amount2 * dataRates.rates[currencyToSell] / dataRates.rates[currencyToBuy]));
        setAmountCurrencyToBuy(amount2);
    }

    function handleCurrency2Change(currency2: string) {
        if (!dataRates) return;
        setAmountCurrencyToSell(roundToFour(amountCurrencyToBuy * dataRates.rates[currencyToSell] / dataRates.rates[currency2]));
        setCurrencyToBuy(currency2);
        updateQueryParams(currencyToSell, currency2);
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
                    amount={amountCurrencyToSell}
                    label={`${t('currencyExchangeCard.sellCurrencyLabel')}:`}
                    currency={currencyToSell}
                    onAmountChange={handleAmount1Change}
                    onCurrencyChange={handleCurrency1Change}
                    currencies={supportedCurrencyForInputs}/>
                <div className={"w-full flex justify-center my-5"}>
                    <Tooltip content={t('currencyExchangeCard.swapTooltip')}>
                        <button onClick={handleSwap} className={"swap-button"}>
                            <MdSwapCalls size={48}/>
                        </button>
                    </Tooltip>
                </div>
                <CurrencyUniversalInput
                    amount={amountCurrencyToBuy}
                    label={`${t('currencyExchangeCard.buyCurrencyLabel')}:`}
                    currency={currencyToBuy}
                    onAmountChange={handleAmount2Change}
                    onCurrencyChange={handleCurrency2Change}
                    currencies={supportedCurrencyForInputs}

                />
            </>
        </CurrencyExchangeCard>
    )
}