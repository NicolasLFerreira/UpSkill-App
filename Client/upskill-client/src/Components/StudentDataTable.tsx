import * as React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"

// Definitions

interface Column {
    id: 'firstName' | 'lastName' | 'yearIn2022' | 'dob' | 'ethnicity';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'firstName', label: 'First\u00a0Name', minWidth: 50 },
    { id: 'lastName', label: 'Last\u00a0Name', minWidth: 50 },
    {
        id: 'yearIn2022',
        label: 'Year\u00a0In\u00a0' + new Date().getFullYear(),
        minWidth: 25,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'dob',
        label: 'DOB',
        minWidth: 100,
        align: 'right'
    },
    {
        id: 'ethnicity',
        label: 'Ethnicity',
        minWidth: 50,
        align: 'right'
    },
];

interface Data {
    firstName: string;
    lastName: string;
    yearIn2022: number;
    dob: string;
    ethnicity: string;
}

function createData(
    firstName: string,
    lastName: string,
    yearIn2022: number,
    dob: string,
    ethnicity: string
): Data {
    return { firstName, lastName, yearIn2022, dob, ethnicity };
}

// Generating row

const names = ['Nicolas', 'Bob', 'Michael', 'John', 'Steve', 'Carl', 'Jack', 'Paul', 'Josh', 'Joshua'];
const surnames = ['Ferreira', 'Stevens', 'Smith', 'Wood', 'Brown', 'Maxwell', 'Carpenter', 'Thorpe', 'Thompson'];

const rows: Data[] = [];

function randomRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function FillRows(amount: number) {

    for (let index = 0; index < amount; index++) {
        rows[index] = createData(
            names[randomRange(0, names.length)],
            surnames[randomRange(0, surnames.length)],
            randomRange(11, 14),
            "yes",
            "latino"
        );
    }
}

// JSX

export default function StudentDataTable() {
    FillRows(100);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 880 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.dob}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}