import React, { Fragment } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { TextFields } from "@mui/icons-material";
import { Box } from "@mui/material";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "firstName",
        headerName: "First Name",
        width: 150,
        editable: true
    },
    {
        field: "lastName",
        headerName: "Last Name",
        width: 150,
        editable: true
    },
    {
        field: "age",
        headerName: "Age",
        width: 110,
        editable: true
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    }
]



function RowGenerator() {
    const objectArray = [];
    for (let index = 0; index < 10; index++) {
        objectArray[index] = {
            id: index,
            lastName: "ferreira",
            firstName: "nicolas",
            age: 18
        }
    }

    return objectArray;
}

export default function DatabaseScreen() {
    return (
        <Fragment>
            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={RowGenerator()}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    scrollbarSize={1}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
        </Fragment>
    );
}