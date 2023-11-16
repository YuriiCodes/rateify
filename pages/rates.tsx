import {title, subtitle} from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {CurrencyExchangeTable} from "@/components/exchange-table/currency-exchange-table";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

export default function RatesPage() {
    const {t} = useTranslation();
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={title()}>{t('ratesPage.titleFirst')} &nbsp;</h1>
                    <h1 className={title({color: "violet"})}>{t('ratesPage.titleSecond')}&nbsp;</h1>


                    <h2 className={subtitle({class: "mt-4"})}>
                        {t('ratesPage.subHeading')}
                    </h2>
                </div>
                <div className={"w-screen md:w-1/2 lg:w-3/4"}>
                    <CurrencyExchangeTable/>
                </div>
            </section>
        </DefaultLayout>
    );
}

export async function getServerSideProps({ locale }: {locale: string}) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
            // Will be passed to the page component as props
        },
    }
}