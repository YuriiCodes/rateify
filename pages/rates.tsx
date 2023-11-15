import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import {CurrencyExchangeTable} from "@/components/currency-exchange-table";

export default function RatesPage() {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={title()}>Rates &nbsp;</h1>
                    <h1 className={title({ color: "violet" })}>Page&nbsp;</h1>


                    <h4 className={subtitle({ class: "mt-4" })}>
                        Rates can be found here :)
                    </h4>
                </div>
                <CurrencyExchangeTable />

            </section>
        </DefaultLayout>
    );
}
