import React, { ChangeEvent, Component, ReactNode } from "react";
import { List, Button, TextField } from "@mui/material";
import { default as Box } from "@mui/material/Unstable_Grid2/Grid2";
import IStudent from "../../types/IStudent";
import StudentDataCrud from "../../services/StudentDataCrud";
import studentSearch from "../../studentSearch";
import { blueGrey } from "@mui/material/colors";
import SelectMultiple from "../SelectMultiple";
import { studentProperties } from "../../utility/StudentUtility";

interface IProps {
    callback: (student: IStudent) => void
}
interface IState {
    students: Array<IStudent>,
    studentsFiltered: Array<IStudent>,
    propertiesFiltered: Array<string>,
    searchString: string
}

const defaultFilteredProperties: Array<string> = ["firstName", "lastName"];

export default class FormSearch extends Component<IProps, IState>{
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

    StudentContainer(student: IStudent) {
        return (
            <Box sx={{ m: 1 }}>
                <Button variant="contained" sx={{ width: "100%", backgroundColor: blueGrey[700] }} onClick={() => this.props.callback(student)}>
                    ({student.yearLevel}) {student.lastName}, {student.firstName}
                </Button>
            </Box>
        );
    }

    registerChange = (value: string) => {
        this.setState({
            studentsFiltered: studentSearch(this.state.students, value, this.state.propertiesFiltered),
            searchString: value
        });
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
    }

    render() {
        var array: Array<ReactNode> = [];
        this.state.studentsFiltered.forEach(student => {
            array.push(this.StudentContainer(student));
        });

        return (
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, minHeight: 0 }}>
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
                {<SelectMultiple callback={(properties: Array<string>) => (this.updateProperties(properties))} items={studentProperties} label="Properties" />}
                <List style={{ width: "100%", overflow: "auto", flexGrow: 1, minHeight: 0 }}>
                    {array}
                </List>
            </Box>
        );
    }
}