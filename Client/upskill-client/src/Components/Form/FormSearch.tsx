import React, { ChangeEvent, Component, ReactNode } from "react";
import { List, Button, TextField } from "@mui/material";
import { default as Box } from "@mui/material/Unstable_Grid2/Grid2";
import IStudent from "../../types/IStudent";
import StudentDataCrud from "../../services/StudentDataCrud";
import studentSearch from "../../studentSearch";

interface IProps {
    callback: (student: IStudent) => void
}
interface IState {
    students: Array<IStudent>,
    studentsFiltered: Array<IStudent>
}

export default class FormSearch extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);

        this.state = {
            students: [],
            studentsFiltered: []
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
                <Button variant="contained" sx={{ width: "100%" }} onClick={() => this.props.callback(student)}>
                    {student.studentId}: {student.firstName}, {student.lastName}
                </Button>
            </Box>
        );
    }

    registerChange = (value: string) => {
        this.setState({
            studentsFiltered: studentSearch(this.state.students, value)
        });
    }

    render() {
        var array: Array<ReactNode> = [];
        this.state.studentsFiltered.forEach(student => {
            array.push(this.StudentContainer(student));
        });

        return (
            <Box>
                <TextField
                    type="search"
                    label="Enter name"
                    sx={{ m: 1 }}
                    onChange={
                        (e) =>
                            this.registerChange(e.target.value)
                    }
                />
                <List style={{ height: "400px", width: "100%", overflow: "auto" }}>
                    {array}
                </List>
            </Box>
        );
    }
}