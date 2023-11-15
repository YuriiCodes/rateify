import { render, screen } from '@testing-library/react'
import IndexPage from '../pages/index'
import '@testing-library/jest-dom'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();
const Wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);
describe('Home', () => {
    beforeEach(() => {
        queryClient.clear();
    }),

    it('renders a heading', () => {
        render(<IndexPage />, { wrapper: Wrapper });

        // check if there's h1 element with "Currency Exchange" text:
        const heading = screen.getByRole('heading', { name: 'Currency Exchange' });

        expect(heading).toBeInTheDocument();
    });

    it('renders a sub heading with CTA', () => {
        render(<IndexPage />, { wrapper: Wrapper });
        const subHeading = screen.getByRole('heading', { name: 'Please use the form below to exchange currencies' });

        expect(subHeading).toBeInTheDocument();
    })``

    it('renders the currency exchange form loading state', () => {

        jest.mock('react-query', () => ({
            useQuery: jest.fn().mockReturnValue(({ data: null, isLoading: false, isError: false })),
        }));
        render(<IndexPage />, { wrapper: Wrapper });
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
});