import {title, subtitle} from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Divider, Listbox, ListboxItem} from "@nextui-org/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export default function AboutPage() {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={title()}>About &nbsp;</h1>
                    <h1 className={title({color: "violet"})}>Page&nbsp;</h1>


                    <h2 className={subtitle({class: "mt-4"})}>
                        We&apos;re simple yet efficient currency converter.
                    </h2>

                    <Card>
                        <CardHeader>
                            Tech Stack
                        </CardHeader>
                        <CardBody>
                            <Divider />
                            <Listbox
                                aria-label="Tech Stack"
                            >
                                <ListboxItem key="Next 13">Next JS 13</ListboxItem>
                                <ListboxItem key="Tailwind">TailwindCSS</ListboxItem>
                                <ListboxItem key="Next UI">Next UI</ListboxItem>
                                <ListboxItem key="Tanstack Query">Tanstack Query</ListboxItem>
                                <ListboxItem key="Vercel">Hosted @Vercel</ListboxItem>
                            </Listbox>
                        </CardBody>
                    </Card>

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
