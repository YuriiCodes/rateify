import {Card, CardBody, CardHeader} from "@nextui-org/card";

import {CurrencyUniversalInput} from "@/components/currency-universal-input";
import useSupportedCurrencies from "@/hooks/useSupportedCurrencies";
import {useMemo, useState} from "react";
import {mapSupportedCurrencies} from "@/types/typeMappers";
import useExchangeRates from "@/hooks/useExchageRates";
import _ from 'lodash';
import {
    getKeyValue,
    Input,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";

const INIT_BASE_CURR = "USD";

export const CurrencyExchangeTable = () => {
    const [amount, setAmount] = useState<number>(0);

    // we debounce the amount change to avoid unnecessary re-renders while the user is typing.
    const debouncedSetAmount = useMemo(() => _.debounce(value => setAmount(value), 300), []);
    const [currency, setCurrency] = useState<string>(INIT_BASE_CURR);

    const [inputAmount, setInputAmount] = useState<number>(0); // New state for input value
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const searchInput = (
        <Input
            isClearable
            placeholder="Search by currency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );

    // Immediate update for input field, delayed update for conversion
    const handleAmountChange = (value: number) => {
        setInputAmount(value); // Update input immediately
        debouncedSetAmount(value); // Debounce for conversion update
    };
    // fetching the list of supported currencies
    const {
        data: dataSupCurr
        , isLoading: isLoadingSupCurr, isError: isErrorSupCurr
    } = useSupportedCurrencies();

    // useMemo to transform the data only when 'data' changes
    const supportedCurrencyForInputs = useMemo(() => {
        return dataSupCurr ? mapSupportedCurrencies(dataSupCurr) : [];
    }, [dataSupCurr]);


    // fetching the exchange rates for base currency
    const {data: dataRates, isLoading: isLoadingRates, isError: isErrorRates} = useExchangeRates(currency);


    const conversions = useMemo(() => {
        if (!dataRates) return [];
        return Object.keys(dataRates.rates).map(currency => ({
            currency,
            value: (amount * dataRates.rates[currency]).toFixed(4),
        }));
    }, [amount, dataRates]);

    const columns = [
        { key: 'currency', label: 'Currency' },
        { key: 'value', label: 'Value' }
    ];


    const filteredConversions = useMemo(() => {
        return conversions.filter(conversion =>
            conversion.currency.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [conversions, searchTerm]);

    const paginatedConversions = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredConversions.slice(start, end);
    }, [filteredConversions, page, rowsPerPage]);

    const rowsPerPageOptions = [5, 10, 15, 20];
    const rowsPerPageSelect = (
        <select
            value={rowsPerPage}
            onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1); // Reset to first page on rows per page change
            }}
        >
            {rowsPerPageOptions.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );

    const paginationControls = (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {rowsPerPageSelect}
            <Pagination
                total={Math.ceil(filteredConversions.length / rowsPerPage)}
                page={page}
                onChange={setPage}
            />
        </div>
    );



    if (isLoadingSupCurr) return <div>loading supported currencies...</div>
    if (isErrorSupCurr) return <div>error supported currencies...</div>

    if (isLoadingRates) return <div>loading exchange rates...</div>
    if (isErrorRates) return <div>error exchange rates...</div>

    return (
        <Card className="py-4 w-1/2 flex">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                <h1 className="text-large uppercase font-bold">Currency Exchange</h1>
                <small className="text-default-500">Enter the amount and select the currency pair</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <CurrencyUniversalInput
                    amount={inputAmount}
                    label={"Currency I want to sell"}
                    currency={currency}
                    onAmountChange={handleAmountChange}
                    onCurrencyChange={setCurrency}
                    currencies={supportedCurrencyForInputs}/>


                {searchInput}
                <Table aria-label="Currency Exchange Table">
                    <TableHeader>
                        {columns.map((column) =>
                            <TableColumn key={column.key}>{column.label}</TableColumn>
                        )}
                    </TableHeader>
                    <TableBody>
                        {paginatedConversions.map((row) =>
                            <TableRow key={row.value}>
                                {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {paginationControls}
            </CardBody>
        </Card>
    )
}