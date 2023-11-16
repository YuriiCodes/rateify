import {MdSwapCalls} from "react-icons/md";
import {CurrencyExchangeCard} from "@/components/currency-exchange-card";
import {UniversalInputLoading} from "@/components/universal-input/universal-input-loading";


export const CurrencyExchangeFormLoading = () => {
    return (
        <CurrencyExchangeCard>
            <>
                <div className={"form-loading text-sm"}>Loading...</div>
                <UniversalInputLoading/>
                <div className={"w-full flex justify-center my-5"}>
                    <MdSwapCalls size={48}/>
                </div>
                <UniversalInputLoading/>
            </>
        </CurrencyExchangeCard>
    )
}