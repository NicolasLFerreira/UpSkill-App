import React, { Component, ReactNode } from "react";
import { Input, List, Typography, Button } from "@mui/material";
import { default as Box } from "@mui/material/Unstable_Grid2/Grid2";
import IStudent from "../../types/IStudent";
import StudentDataCrud from "../../services/StudentDataCrud";

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

    // Search functions

    searchStudent = (searchInput: string) => {
        searchInput = searchInput.toLowerCase();
        var filteredStudents: Array<IStudent> =
            this.state.students.filter(s =>
                this.isSubsequence(searchInput, s.firstName + " " + s.lastName)
            );

        this.setState({
            studentsFiltered: filteredStudents
        })

        return filteredStudents;
    }

    isSubsequence(input: string, name: string) {
        var inputSize = input.length
        var nameSize = name.length;
        var inputIndex = 0
        var nameIndex = 0;

        while (inputIndex < inputSize && nameIndex < nameSize) {
            if (input.toLowerCase()[inputIndex] == name.toLowerCase()[nameIndex])
                inputIndex++;
            nameIndex++;
        }

        return inputIndex == inputSize;
    }

    StudentContainer(student: IStudent) {
        return (
            <Box sx={{ m: 1 }}>
                <Button variant="contained" sx={{ width: "100%" }} onClick={() => this.props.callback(student)}>{student.studentId}: {student.firstName}, {student.lastName}</Button>
            </Box>
        );
    }

    render() {
        var array: Array<ReactNode> = [];
        this.state.studentsFiltered.forEach(student => {
            array.push(this.StudentContainer(student));
        });

        console.log("form search");
        console.log(this.state.studentsFiltered);

        return (
            <Box>
                <Input type="search" placeholder="Student name" sx={{ ml: 1 }} onChange={(e) => console.log(this.searchStudent(e.target.value))} />
                <List style={{ maxHeight: 400, overflow: "auto" }}>
                    {array}
                </List>
            </Box>
        );
    }
}