import React, { Component } from "react";
import { RepeatOneSharp, ThreeKSharp } from "@mui/icons-material";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import StudentDataCrud from "../../services/StudentDataCrud";
import IStudentData, { createStudent, defaultStudentObject, emptyStudentObject } from "../../types/IStudentData";
import FormModal from "./FormModal";

interface IProps {

}

interface IState {
    students: Array<IStudentData>,
    currentStudent: IStudentData | null,
    currentIndex: number,
    searchTitle: string
}

export default class FormPage extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            students: [],
            currentStudent: null,
            currentIndex: -1,
            searchTitle: ""
        }
    }

    componentDidMount() {
        this.retrieveStudents();
    }

    retrieveStudents() {
        StudentDataCrud.getAll()
            .then((response: any) => {
                this.setState({
                    students: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    studentPost(content: IStudentData) {
        console.log("to be posted:");
        console.log(content);

        StudentDataCrud.post(content)
            .then((response) => {
                console.log(response);
            })
            .catch((e: Error) => {
                console.log(e);
            })
    }

    render() {
        var object: typeof emptyStudentObject = emptyStudentObject;
        object = createStudent();

        return (
            <Box sx={{ flexGrow: 1 }}>
                <FormModal createStudentCallback={(student: IStudentData) => this.studentPost(student)} />
                <Button variant="contained" onClick={() => this.studentPost(createStudent())}>Auto generator</Button>
                <Button variant="contained" onClick={() => this.studentPost(defaultStudentObject)}>Default object</Button>
                <Button variant="contained" onClick={() => this.studentPost(object)}>Default changed</Button>
            </Box>
        );
    }
}