import {Divider} from "@nextui-org/react";
import {CurrencyExchangeCard} from "@/components/currency-exchange-card";
import {UniversalInputLoading} from "@/components/universal-input/universal-input-loading";

export const LoadingExchangeTable = () => {
    return <CurrencyExchangeCard>
        <>
            <UniversalInputLoading/>
            <Divider orientation="horizontal" className="my-8"/>
            {Array.from({length: 5}).map((_, i) => (
                    <UniversalInputLoading key={i}/>
                )
            )}
        </>
    </CurrencyExchangeCard>
}