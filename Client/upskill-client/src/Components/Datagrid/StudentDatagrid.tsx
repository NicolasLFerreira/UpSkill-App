import React, { Component } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColumns, gridClasses } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import IStudentData from '../../types/IStudentData';
import IStudentDataDisplay from '../../types/IStudentDataDisplay';
import { selectOptions as values } from "../../utility/StudentDataUtility";

const ODD_OPACITY: number = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: theme.palette.grey[200],
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            '@media (hover: none)': {
                backgroundColor: "#00ff00",
            },
        },
        '&.Mui-selected': {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity,
                ),
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY + theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    },
}));

const columns: GridColumns = [
    { field: "firstName", headerName: "First Name", minWidth: 180, editable: true },
    { field: "lastName", headerName: "Last Name", minWidth: 180, editable: true },
    { field: "yearLevel", headerName: "Year Level", minWidth: 60, editable: true, type: "number", headerAlign: "left", align: "left" },
    { field: "dob", headerName: "DOB", minWidth: 120, editable: true, type: "date" },
    { field: "ethnicity", headerName: "Ethnicity", minWidth: 120, editable: true },
    { field: "tutor", headerName: "Tutor", minWidth: 120, editable: true },
    { field: "areaOfNeedShow", headerName: "Area of Need", minWidth: 90, editable: true, type: "number", headerAlign: "left", align: "left" },
    { field: "diagnosis", headerName: "Diagnosis", minWidth: 120, editable: true },
    { field: "externalAgencies", headerName: "External Agencies", minWidth: 180, editable: true },
    { field: "responseShow", headerName: "Response", minWidth: 90, editable: true, type: "number", headerAlign: "left", align: "left" },
    { field: "sacShow", headerName: "SAC", minWidth: 90, editable: true, type: "number", headerAlign: "left", align: "left" },
    { field: "notes", headerName: "Notes", minWidth: 180, editable: true },
    { field: "links", headerName: "Links", minWidth: 180, editable: true },
    { field: "kamarUpdates", headerName: "Kamar Updates", minWidth: 180, editable: true },
    { field: "pronoun", headerName: "Pronoun", minWidth: 180, editable: true },
    { field: "sacInfo", headerName: "SAC Info", minWidth: 180, editable: true },
    { field: "otherInfo", headerName: "Other Info", minWidth: 180, editable: true }
];

interface IProps {
    students: Array<IStudentData>
}

interface IState {
    students: Array<IStudentDataDisplay>
}

export default class StudentDatagrid extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            students: []
        }
    }

    buildStudents() {
        return this.props.students.map((student) => {
            return this.newStudent(student);
        });
    }

    newStudent(student: IStudentData) {
        var studentUpdated: IStudentDataDisplay = student;
        studentUpdated.areaOfNeedShow = values.areaOfNeed[student.areaOfNeed];
        studentUpdated.responseShow = values.response[student.response];
        studentUpdated.sacShow = values.sac[student.sac];

        console.log(studentUpdated);

        return studentUpdated;
    }

    render() {
        return (
            <Box style={{ height: "90vh", width: "100%" }}>
                <StripedDataGrid
                    rows={this.buildStudents()}
                    columns={columns}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row.studentId}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                    }
                />
            </Box>
        );
    }
}