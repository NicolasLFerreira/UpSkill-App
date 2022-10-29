import React, { ChangeEvent, Component, ReactNode } from "react";
import { List, Button, TextField } from "@mui/material";
import { default as Box } from "@mui/material/Unstable_Grid2/Grid2";
import IStudent from "../../types/IStudent";
import StudentDataCrud from "../../services/StudentDataCrud";
import studentSearch from "../../studentSearch";
import { blueGrey } from "@mui/material/colors";
import SelectMultiple from "../SelectMultiple";
import { studentProperties } from "../../utility/StudentUtility";
import StudentFilter from "../StudentFilter";

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

    StudentContainer(student: IStudent) {
        return (
            <Box sx={{ m: 1 }}>
                <Button variant="contained" sx={{ width: "100%", backgroundColor: blueGrey[700] }} onClick={() => this.props.callback(student)}>
                    ({student.yearLevel}) {student.lastName}, {student.firstName}
                </Button>
            </Box>
        );
    }

    registerChange = (students: Array<IStudent>) => {
        this.setState({
            studentsFiltered: students
        });
    }

    render() {
        var array: Array<ReactNode> = [];
        this.state.studentsFiltered.forEach(student => {
            array.push(this.StudentContainer(student));
        });

        return (
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, minHeight: 0 }}>
                <StudentFilter
                    callback={(students: Array<IStudent>) => this.registerChange(students)} mode={false} />
                <List style={{ width: "100%", overflow: "auto", flexGrow: 1, minHeight: 0 }}>
                    {array}
                </List>
            </Box>
        );
    }
}