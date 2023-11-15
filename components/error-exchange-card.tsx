import {Button} from "@nextui-org/react";
import {CurrencyExchangeCard} from "@/components/currency-exchange-card";

interface ErrorExchangeFormProps {
    failedResource: string;
    refetch: () => void;
    isFetching: boolean;
}

export const ErrorExchangeCard = ({failedResource, refetch, isFetching}: ErrorExchangeFormProps) => {
    return <CurrencyExchangeCard>
        <div className={"flex flex-col gap-4 w-full my-1"}>
            <div className={"text-red-500 text-center"}>
                <p>{`Something went wrong during loading ${failedResource}... `}</p>
                <p>Try again later, or try to refresh</p>
                <Button onClick={refetch} disabled={isFetching}>
                    Refresh
                </Button>
            </div>
        </div>
    </CurrencyExchangeCard>
}