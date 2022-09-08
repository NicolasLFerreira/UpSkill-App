import React, { Component } from "react";
import { RepeatOneSharp, ThreeKSharp } from "@mui/icons-material";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import StudentDataCrud from "../../services/StudentDataCrud";
import IStudentData, { createStudent, defaultStudentObject, emptyStudentObject } from "../../types/IStudentData";
import FormModal from "./FormModal";
import Form from "./Form";

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
    }

    render() {
        return (
            <Grid container sx={{ flexGrow: 1 }} justifyItems="center">
                {/* <FormModal createStudentCallback={(student: IStudentData) => this.studentPost(student)} /> */}{/* legacy */}
                <Form />
            </Grid>
        );
    }
}