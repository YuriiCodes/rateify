import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import { Head } from "./head";
import {useTranslation} from "next-i18next";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const {t} = useTranslation();
	return (
		<div className="relative flex flex-col h-screen">
			<Head />
			<Navbar />
			<main className="container mx-auto max-w-7xl px-6 flex-grow">
				{children}
			</main>
			<footer className="w-full flex items-center justify-center py-3">
				<Link
					isExternal
					className="flex items-center gap-1 text-current"
					href="https://www.linkedin.com/in/yurii-pidlisnyi/"
					title={t('footer.author')}
				>
					<span className="text-default-600">{t('footer.madeWithLove')}</span>
					<p className="text-primary">{t('footer.author')}</p>
				</Link>
			</footer>
		</div>
	);
}
