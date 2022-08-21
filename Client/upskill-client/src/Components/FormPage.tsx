import React, { Component } from "react";
import StudentDataService from "../services/student.service";
import IStudentData from "../types/student.type";

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
            </div>
        );
    }

    render() {
        var jsxArray = this.state.students.map((element: IStudentData) => this.makeJSX(element));

        return (
            <div>
                {jsxArray}
            </div>
        )
    }
}