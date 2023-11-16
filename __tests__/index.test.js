import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AboutPage from "../pages/about";


// It was my first time writing Unit tests, I guess they are not that efficient.
// e2e tests fully cover the main functionality of the app, so please rely on them as an app test.
// that unit tests are just for demonstration purposes.

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

    it('renders a heading of about page', () => {
        render(<AboutPage />, { wrapper: Wrapper });

        // check if there's h1 element with "Currency Exchange" text:
        const heading = screen.getByRole('heading', { name: 'About' });

        expect(heading).toBeInTheDocument();
    });

});