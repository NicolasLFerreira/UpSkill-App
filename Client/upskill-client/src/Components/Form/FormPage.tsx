import React, { Component } from "react";
import { Grid } from "@mui/material";
import IStudentData from "../../types/IStudentData";
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