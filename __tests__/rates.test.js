import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import RatesPage from "../pages/rates";


const queryClient = new QueryClient();
const Wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);
describe('Rates Page', () => {
    beforeEach(() => {
        queryClient.clear();
    }),

    it('renders a sub heading with CTA', () => {
        render(<RatesPage />, { wrapper: Wrapper });
        const subHeading = screen.getByRole('heading', { name: 'Rates can be found here :)' });

        expect(subHeading).toBeInTheDocument();
    })
    it('renders a heading', () => {
        render(<RatesPage />, { wrapper: Wrapper });

        // check if there's h1 element with "Currency Exchange" text:
        const heading = screen.getByRole('heading', { name: 'Rates' });

        expect(heading).toBeInTheDocument();
    });


});