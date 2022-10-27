import { Box, MenuItem, TextField } from "@mui/material";
import React, { Component, useState } from "react";
import StudentDataCrud from "../../services/StudentDataCrud";
import studentSearch from "../../studentSearch";
import IStudent from "../../types/IStudent";
import { default as Grid } from "@mui/material/Unstable_Grid2";
import StudentDatagrid from "./StudentDatagrid";
import { studentProperties } from "../../utility/StudentUtility";
import SelectMultiple from "../SelectMultiple";

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

    registerChange = (value: string) => {
        this.setState({
            studentsFiltered: studentSearch(this.state.students, value, this.state.propertiesFiltered.length == 0 ? defaultFilteredProperties : this.state.propertiesFiltered),
            searchString: value
        });
    }

    updateProperties = (properties: Array<string>) => {
        this.setState({
            propertiesFiltered: (properties),
            studentsFiltered: studentSearch(this.state.students, this.state.searchString, properties)
        });
    }

    render() {
        return (
            <Grid container justifyContent="center" alignContent="center" justifyItems="center" alignItems="center">
                <Grid container xs={12} spacing={1} sx={{ my: 1 }}>
                    <Grid xs={2}>
                        <TextField
                            variant="outlined"
                            label="Filter"
                            // onBlur={() => console.log("SHIT AND PISS")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.registerChange(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={2}>
                        {<SelectMultiple
                            label="Properties"
                            items={studentProperties}
                            callback={(properties: Array<string>) => (this.updateProperties(properties))}
                        />}
                    </Grid>
                </Grid>
                <Grid xs={12}>
                    <StudentDatagrid students={this.state.studentsFiltered} />
                </Grid>
            </Grid>
        );
    }
}