import { title, subtitle } from "@/components/primitives";

import DefaultLayout from "@/layouts/default";
import {CurrencyExchangeForm} from "@/components/two-curr-exchange-form/currency-exchange-form";
import {useTranslation} from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function IndexPage() {
	const {t} = useTranslation();
	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-lg text-center justify-center">
					<h1 className={title()}>{t('index.titleFirst')}&nbsp;</h1>
					<h1 className={title({ color: "violet" })}>{t('index.titleSecond')}&nbsp;</h1>
					<br />
					<h2 className={subtitle({ class: "mt-4" })}>
						{t('index.subHeading')}
					</h2>
				</div>

				<div className="mt-8 w-screen md:w-1/2 lg:w-3/4 flex  justify-center">
					<CurrencyExchangeForm />
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