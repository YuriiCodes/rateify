import {Card, CardBody, CardHeader} from "@nextui-org/card";
import React from "react";
import {useTranslation} from "next-i18next";

export const CurrencyExchangeCard = ({children}: {
    children: React.ReactElement
}) => {
    const {t} = useTranslation();
    return <Card className="p-5 w-full flex">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
            <h3 className="text-large uppercase font-bold">{t('currencyExchangeCard.title')}</h3>
            <small className="text-default-500">{t('currencyExchangeCard.subHeading')}</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2 w-full">
            {children}
        </CardBody>
    </Card>
}