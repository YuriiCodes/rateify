import {Card, CardBody, CardHeader} from "@nextui-org/card";

export const CurrencyExchangeCard = ({children}: {
    children: React.ReactElement
}) => {
    return <Card className="p-5 w-full flex">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
            <h1 className="text-large uppercase font-bold">Currency Exchange</h1>
            <small className="text-default-500">Enter the amount and select the currency pair</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2 w-full">
            {children}
        </CardBody>
    </Card>
}