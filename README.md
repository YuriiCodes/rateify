# Rateify

That is a simple app to exchange rates between currencies. It uses the [Exchange Rates API](https://exchangeratesapi.io) to get the rates.

## Technologies Used

- [Next.js 13](https://nextjs.org/docs/getting-started)
- [NextUI](https://nextui.org)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org)
- [Framer Motion](https://www.framer.com/motion)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use
### App
To launch the app locally, run the following commands in your terminal:

```bash
npm install
```

create a `.env` file in the root of the project and paste your API key like this:

```
RATE_EXCHANGE_API_KEY=YOUR_API_KEY
```
Also add the `RATE_EXCHANGE_BACKEND_BASIC_URL` variable to the `.env` file:
```
RATE_EXCHANGE_BACKEND_BASIC_URL=https://api.exchangeratesapi.io/v1
```
A detailed example of the `.env` file can be found in the `.env.example` file.


then run the following command in your terminal:

```bash
npm run dev
```

### E2E Cypress Tests
To run the E2E Cypress tests, run the following commands in your terminal:

```bash
npm run e2e
```
or
```bash
npm run e2e:headless
```
to run the tests in headless mode.

### Unit Tests
To run the unit tests, run the following commands in your terminal:

```bash
npm run test
```

### Linting
To run the linting, run the following commands in your terminal:

```bash
npm run lint
```
