import {title, subtitle} from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {CurrencyExchangeTable} from "@/components/currency-exchange-table";

export default function RatesPage() {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={title()}>Rates &nbsp;</h1>
                    <h1 className={title({color: "violet"})}>Page&nbsp;</h1>


                    <h4 className={subtitle({class: "mt-4"})}>
                        Rates can be found here :)
                    </h4>
                </div>
                <div className={"w-screen md:w-1/2 lg:w-3/4"}>
                    <CurrencyExchangeTable/>
                </div>
            </section>
        </DefaultLayout>
    );
}
