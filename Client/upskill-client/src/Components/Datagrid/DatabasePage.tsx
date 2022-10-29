import { Box, MenuItem, TextField } from "@mui/material";
import React, { Component, useState } from "react";
import StudentDataCrud from "../../services/StudentDataCrud";
import studentSearch from "../../studentSearch";
import IStudent from "../../types/IStudent";
import { default as Grid } from "@mui/material/Unstable_Grid2";
import StudentDatagrid from "./StudentDatagrid";
import { studentProperties } from "../../utility/StudentUtility";
import SelectMultiple from "../SelectMultiple";
import StudentFilter from "../StudentFilter";

interface IProps { }
interface IState {
    students: Array<IStudent>,
    studentsFiltered: Array<IStudent>,
    propertiesFiltered: Array<string>,
    searchString: string
}

const defaultFilteredProperties: Array<string> = ["firstName", "lastName"];

export default class DatabasePage extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        // var object: Array<IStudent> = [emptyStudentObject];

        this.state = {
            students: [],
            studentsFiltered: [],
            propertiesFiltered: defaultFilteredProperties,
            searchString: ""
        }
    }

    componentDidMount() {
        this.getStudents();
    }

    // Get student data

    getStudents = () => {
        StudentDataCrud.getAll()
            .then((response: any) => {
                this.setState({
                    students: response.data,
                    studentsFiltered: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    registerChange = (students: Array<IStudent>) => {
        this.setState({
            studentsFiltered: students
        });
    }

    render() {
        return (
            <Grid container justifyContent="center" alignContent="center" justifyItems="center" alignItems="center">
                <Grid container xs={12} spacing={1} sx={{ my: 1 }}>
                    <StudentFilter callback={(students: Array<IStudent>) => this.registerChange(students)} mode={true} />
                </Grid>
                <Grid xs={12}>
                    <StudentDatagrid students={this.state.studentsFiltered} />
                </Grid>
            </Grid>
        );
    }
}