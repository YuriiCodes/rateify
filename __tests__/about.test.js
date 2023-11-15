import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AboutPage from "../pages/about";

const queryClient = new QueryClient();
const Wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);
describe('About Page', () => {
    beforeEach(() => {
        queryClient.clear();
    }),

        it('renders a heading', () => {
            render(<AboutPage />, { wrapper: Wrapper });

            // check if there's h1 element with "Currency Exchange" text:
            const heading = screen.getByRole('heading', { name: 'About' });

            expect(heading).toBeInTheDocument();
        });

});