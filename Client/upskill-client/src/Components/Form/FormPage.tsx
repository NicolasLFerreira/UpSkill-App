import React, { Component } from "react";
import { Grid } from "@mui/material";
import IStudent from "../../types/IStudentData";
import Form from "./Form";

interface IProps {

}

interface IState {
    students: Array<IStudent>,
    currentStudent: IStudent | null,
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