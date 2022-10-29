import { TextField } from "@mui/material";
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

    // Get student data

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

    // State handling

    registerChange = (value: string) => {
        var students: Array<IStudent> = studentSearch(this.state.students, value, this.state.propertiesFiltered)
        this.setState({
            studentsFiltered: students,
            searchString: value
        });

        this.props.callback(students);
    }

    updateProperties = (properties: Array<string>) => {
        // First declaration adds the default filter to the filtered properties.
        // Maybe add a switch in the future so the user can decide which case should apply.
        // var newProperties: Array<string> = properties.length == 0 ? defaultFilteredProperties : properties;

        var newProperties: Array<string> = properties;
        var students: Array<IStudent> = studentSearch(this.state.students, this.state.searchString, properties)
        this.setState({
            propertiesFiltered: newProperties,
            studentsFiltered: students
        })

        this.props.callback(students);
    }

    // Components

    SearchInput() {
        return (
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
        );
    }

    SelectInput() {
        return (
            <SelectMultiple
                label="Properties"
                items={studentProperties}
                callback={
                    (properties: Array<string>) =>
                        (this.updateProperties(properties))
                }
            />
        );
    }

    render() {
        return (
            <Fragment>
                {
                    this.props.mode ?
                        <Fragment>
                            <Grid xs={2}>
                                {this.SearchInput()}
                            </Grid>
                            <Grid xs={2}>
                                {this.SelectInput()}
                            </Grid>
                        </Fragment> :
                        <Fragment>
                            {this.SearchInput()}
                            {this.SelectInput()}
                        </Fragment>
                }
            </Fragment>
        );
    }
}