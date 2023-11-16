import type {AppProps} from "next/app";

import {NextUIProvider} from "@nextui-org/react";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

import {ThemeProvider as NextThemesProvider} from "next-themes";
import {fontSans, fontMono} from "@/config/fonts";
import {useRouter} from 'next/router';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@/styles/globals.css";

const queryClient = new QueryClient()

export default function App({Component, pageProps}: AppProps) {
    const router = useRouter();

    return (
        <QueryClientProvider client={queryClient}>
            <NextUIProvider navigate={router.push}>
                <NextThemesProvider>
                    <Component {...pageProps} />
                </NextThemesProvider>
            </NextUIProvider>

            <ReactQueryDevtools initialIsOpen={false}/>
            <ToastContainer/>
        </QueryClientProvider>
    );
}

export const fonts = {
    sans: fontSans.style.fontFamily,
    mono: fontMono.style.fontFamily,
};
