import { title, subtitle } from "@/components/primitives";

import DefaultLayout from "@/layouts/default";
import {CurrencyExchangeForm} from "@/components/two-curr-exchange-form/currency-exchange-form";


export default function IndexPage() {
	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-lg text-center justify-center">
					<h1 className={title()}>Currency &nbsp;</h1>
					<h1 className={title({ color: "violet" })}>Exchange&nbsp;</h1>
					<br />
					<h4 className={subtitle({ class: "mt-4" })}>
						Please use the form below to exchange currencies
					</h4>
				</div>

				<div className="mt-8 w-screen md:w-1/2 lg:w-3/4 flex  justify-center">
					<CurrencyExchangeForm />
				</div>
			</section>
		</DefaultLayout>
	);
}
