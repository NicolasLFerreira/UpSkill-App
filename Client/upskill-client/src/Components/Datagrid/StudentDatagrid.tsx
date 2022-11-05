import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
    DataGrid,
    GridColumns,
    gridClasses,
    GridRenderCellParams,
} from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import IStudent from "../../types/IStudent";
import IStudentDisplay from "../../types/IStudentDisplay";
import { selectOptions as values } from "../../utility/StudentUtility";
import { ContactPage, ArrowRight } from "@mui/icons-material";

const ODD_OPACITY: number = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: theme.palette.grey[200],
        "&:hover, &.Mui-hovered": {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            "@media (hover: none)": {
                backgroundColor: "#00ff00",
            },
        },
        "&.Mui-selected": {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
            "&:hover, &.Mui-hovered": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                        theme.palette.action.selectedOpacity +
                        theme.palette.action.hoverOpacity
                ),
                // Reset on touch devices, it doesn't add specificity
                "@media (hover: none)": {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY + theme.palette.action.selectedOpacity
                    ),
                },
            },
        },
    },
}));

const columns: GridColumns = [
    {
        field: "formLink",
        headerName: "To Form",
        minWidth: 0,
        headerAlign: "center",
        align: "center",
        renderCell: (params: GridRenderCellParams<any, any, any>) => {
            return (
                <Button
                    variant="text"
                    component={RouterLink}
                    to={`/form/${params.row.studentId}`}
                >
                    <ArrowRight />
                    <ContactPage />
                </Button>
            );
        },
    },
    { field: "firstName", headerName: "First Name", minWidth: 120 },
    { field: "lastName", headerName: "Last Name", minWidth: 120 },
    {
        field: "yearLevel",
        headerName: "Year Level",
        minWidth: 60,
        type: "number",
        headerAlign: "left",
        align: "left",
    },
    { field: "dob", headerName: "DOB", minWidth: 100, type: "date" },
    { field: "ethnicity", headerName: "Ethnicity", minWidth: 100 },
    { field: "tutor", headerName: "Tutor", minWidth: 100 },
    {
        field: "areaOfNeedShow",
        headerName: "Area of Need",
        minWidth: 90,
        type: "number",
        headerAlign: "left",
        align: "left",
    },
    { field: "diagnosis", headerName: "Diagnosis", minWidth: 120 },
    {
        field: "externalAgencies",
        headerName: "External Agencies",
        minWidth: 180,
    },
    {
        field: "responseShow",
        headerName: "Response",
        minWidth: 90,
        type: "number",
        headerAlign: "left",
        align: "left",
    },
    {
        field: "sacShow",
        headerName: "SAC",
        minWidth: 90,
        type: "number",
        headerAlign: "left",
        align: "left",
    },
    { field: "notes", headerName: "Notes", minWidth: 180 },
    { field: "links", headerName: "Links", minWidth: 180 },
    { field: "kamarUpdates", headerName: "Kamar Updates", minWidth: 180 },
    { field: "pronoun", headerName: "Pronoun", minWidth: 180 },
    { field: "sacInfo", headerName: "SAC Info", minWidth: 180 },
    { field: "otherInfo", headerName: "Other Info", minWidth: 180 },
];

interface IProps {
    students: Array<IStudent>;
}

interface IState {}

export default class StudentDatagrid extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    buildStudents() {
        return this.props.students.map((student) => {
            return this.buildDisplayStudent(student);
        });
    }

    buildDisplayStudent(student: IStudent) {
        var studentUpdated: IStudentDisplay = student;
        studentUpdated.areaOfNeedShow = values.areaOfNeed[student.areaOfNeed];
        studentUpdated.responseShow = values.response[student.response];
        studentUpdated.sacShow = values.sac[student.sac];

        return studentUpdated;
    }

    render() {
        return (
            <Box style={{ height: "80vh", width: "100%" }}>
                <StripedDataGrid
                    rows={this.buildStudents()}
                    columns={columns}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row.studentId}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0
                            ? "even"
                            : "odd"
                    }
                />
            </Box>
        );
    }
}
