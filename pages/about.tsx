import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function RatesPage() {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={title()}>About &nbsp;</h1>
                    <h1 className={title({ color: "violet" })}>Page&nbsp;</h1>


                    <h4 className={subtitle({ class: "mt-4" })}>
                        Here we`&apos;`ll talk about us
                    </h4>
                </div>

            </section>
        </DefaultLayout>
    );
}