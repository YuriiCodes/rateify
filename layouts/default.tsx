import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import { Head } from "./head";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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
					title="Yurii Pidlisnyi"
				>
					<span className="text-default-600">Made with love by</span>
					<p className="text-primary">Yurii Pidlisnyi</p>
				</Link>
			</footer>
		</div>
	);
}
