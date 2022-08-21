import { RepeatOneSharp } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { Component } from "react";
import StudentDataService from "../services/StudentDataService";
import IStudentData from "../types/IStudentData";
import StudentDataTable from "./StudentDataTable";

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
        StudentDataService.getAll()
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

    makeJSX(object: IStudentData) {
        return (
            <div>
                First Name: {object.firstName}<br />
                Last Name: {object.lastName}<br />
                Year: {object.yearLevel}<br />
                DOB: {object.dob}<br />
                Ethnicity: {object.ethnicity}<br />
                <br />
            </div>
        );
    }

    postTest() {
        var object: IStudentData = {
            firstName: "test name",
            lastName: "test surname",
            yearLevel: "12",
            dob: "01/02/2004",
            ethnicity: "european",
            tutor: "john",
            areaOfNeed: 3,
            diagnosis: "adhd",
            externalAgencies: "example",
            response: 2,
            sac: 1,
            notes: "This is an example note with random information for the sake of testing the space of the 'notes' field, including numerical value representation i.e. 924895371.",
            links: "https://example.com/",
            kamarUpdates: "example",
            pronoun: "they/them",
            sacInfo: "Information about the SAC.",
            otherInfo: "Information about other stuff."
        }
        StudentDataService.post(object);
    }

    render() {
        var jsxArray = this.state.students.map((element: IStudentData) => this.makeJSX(element));

        return (
            <div>
                {jsxArray}

                <Button onClick={() => this.postTest()}>
                    Click me
                </Button>
            </div>
        )
    }
}