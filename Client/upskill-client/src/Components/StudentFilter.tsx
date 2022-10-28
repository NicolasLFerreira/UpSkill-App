import { Box, TextField } from "@mui/material";
import { default as Grid } from "@mui/material/Unstable_Grid2";
import React, { Component, Fragment } from "react";
import StudentDataCrud from "../services/StudentDataCrud";
import studentSearch from "../studentSearch";
import IStudent from "../types/IStudent";
import { studentProperties } from "../utility/StudentUtility";
import SelectMultiple from "./SelectMultiple";

interface IProps {
    callback: (studentsFiltered: Array<IStudent>) => void,
    mode: boolean
}

interface IState {
    students: Array<IStudent>,
    studentsFiltered: Array<IStudent>,
    propertiesFiltered: Array<string>,
    searchString: string
}

const defaultFilteredProperties = ["firstName", "lastName"];

export default class StudentFilter extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            students: [],
            studentsFiltered: [],
            propertiesFiltered: defaultFilteredProperties,
            searchString: ""
        }
    }

    componentDidMount(): void {
        this.retrieveStudents();
    }

    // Axios instance handling

    retrieveStudents = () => {
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
        return this;
    }

    registerChange = (value: string) => {
        this.setState({
            studentsFiltered: studentSearch(this.state.students, value, this.state.propertiesFiltered),
            searchString: value
        });

        this.props.callback(this.state.studentsFiltered);
    }

    updateProperties = (properties: Array<string>) => {
        // First declaration adds the default filter to the filtered properties.
        // Maybe add a switch in the future so the user can decide which case should apply.
        // var newProperties: Array<string> = properties.length == 0 ? defaultFilteredProperties : properties;
        var newProperties: Array<string> = properties;
        this.setState({
            propertiesFiltered: newProperties,
            studentsFiltered: studentSearch(this.state.students, this.state.searchString, newProperties)
        })

        this.props.callback(this.state.studentsFiltered);
    }

    FormLayout() {
        return (
            <Fragment>
                <TextField
                    type="search"
                    label="Enter student name"
                    sx={{ m: 1 }}
                    InputLabelProps={{ shrink: true }}
                    onChange={
                        (e) =>
                            this.registerChange(e.target.value)
                    }
                />
                <SelectMultiple
                    label="Properties"
                    items={studentProperties}
                    callback={
                        (properties: Array<string>) =>
                            (this.updateProperties(properties))
                    }
                />
            </Fragment>
        );
    }

    DatabaseLayout() {
        return (
            <Fragment>
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
            </Fragment>
        );
    }

    render() {
        return (
            <Fragment>
                {this.props.mode ? this.DatabaseLayout() : this.FormLayout()}
            </Fragment>
        );
    }
}