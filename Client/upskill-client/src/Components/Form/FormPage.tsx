import React, { Component } from "react";
import { Grid } from "@mui/material";
import IStudent from "../../types/IStudent";
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
            // {/* <FormModal createStudentCallback={(student: IStudentData) => this.studentPost(student)} /> */}{/* legacy code, may use it later though */}
            <Form />
        );
    }
}