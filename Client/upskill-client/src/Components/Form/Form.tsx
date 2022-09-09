import React, { Component, ReactNode } from "react";
import { Button, Typography, Input } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import InputField from "./InputField";
import FormSelect from "./FormSelect";
import IStudent from "../../types/IStudent";
import StudentDataCrud from "../../services/StudentDataCrud";
import { selectOptions, defaultStudentObject, ISelectOptions } from "../../utility/StudentUtility";
import IStudentDictionary from "../../types/IStudentDictionary";

// Styles

const gridButtonStyle = {
    justifyContent: "left",
    m: 1
}

const gridInputStyle = {
    m: 1
}

const gridDateStyle = {
    // width: "19.5%"
    m: 1,
    width: "12.3%"
}

// Boilerplate interfaces

enum OperationMode {
    creation,
    update
}

interface IProps { }

interface IState {
    operation: OperationMode,
    students: Array<IStudent>,
    studentsDictionary: IStudentDictionary,
    currentStudent: IStudent,
    currentIndex: number,
    searchTitle: string
}

export default class Form extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            operation: OperationMode.creation,
            students: [],
            studentsDictionary: {},
            currentStudent: defaultStudentObject,
            currentIndex: -1,
            searchTitle: ""
        }
    }

    componentDidMount() {
        this.retrieveStudents();
    }

    // Axios instance handling.

    retrieveStudents = () => {
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

    postStudent(student: IStudent) {
        console.log("to be posted:");
        console.log(student);

        StudentDataCrud.post(student)
            .then((response) => {
                console.log(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    // Loads the student


    // Assigns the changes to the state.
    registerChange = (property: string, value: string | number): void => {
        // Dynamically declares the key of an IStudentData object.
        var object: IStudent = this.state.currentStudent;
        var key: keyof IStudent = property as keyof IStudent;

        // Updates the copy using the key and the given value.
        object[key] = value as never;

        this.setState({
            currentStudent: object
        });

        console.log(this.state.currentStudent);
    }

    // Components

    // Creates an input field and assigns the callback function for registering the changes.
    InputFieldBuilder(property: string, placeholder: string, type: string = "text") {
        var jsxObject: ReactNode;

        if (type == "select") {
            var items: Array<string>;
            var key: keyof ISelectOptions = property as keyof ISelectOptions
            items = selectOptions[key];

            jsxObject = <FormSelect
                property={property}
                placeholder={placeholder}
                items={items!}
                callback={(value: number) => { this.registerChange(property, value); }}
            />
        }
        else {
            jsxObject = <InputField
                type={type}
                property={property}
                placeholder={placeholder}
                sx={type == "text" ? gridInputStyle : gridDateStyle}
                callback={(value: string) => { this.registerChange(property, value); }}
            />
        }

        return jsxObject;
    }

    // Default button for the modal page
    Button(text: string, callback: () => void) {
        return (
            <Button variant="contained" onClick={() => callback()}>
                {text}
            </Button>
        );
    }

    render() {
        return (
            <Grid container>
                <Grid xs={2}>
                    <Input type="search" placeholder="Search for student" />
                </Grid>
                <Grid container xs={10}>
                    <Grid xs={12}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Student name placeholder
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Create, read, update, or delete a student record.
                        </Typography>
                    </Grid>
                    <Grid xs={12}>
                        {this.InputFieldBuilder("firstName", "First name")}
                        {this.InputFieldBuilder("lastName", "Last name")}
                        {this.InputFieldBuilder("ethnicity", "Ethnicity")}
                        {this.InputFieldBuilder("pronoun", "Pronoun")}
                        {this.InputFieldBuilder("dob", "DOB", "date")}
                    </Grid>
                    <Grid xs={12}>
                        {this.InputFieldBuilder("yearLevel", "Year Level")}
                        {this.InputFieldBuilder("tutor", "Tutor")}
                        {this.InputFieldBuilder("diagnosis", "Diagnosis")}
                        {this.InputFieldBuilder("externalAgencies", "External Agencies")}
                        {this.InputFieldBuilder("notes", "Notes")}
                    </Grid>
                    <Grid xs={12}>
                        {this.InputFieldBuilder("links", "Links")}
                        {this.InputFieldBuilder("kamarUpdates", "Kamar Updates")}
                        {this.InputFieldBuilder("sacInfo", "SAC Info")}
                        {this.InputFieldBuilder("otherInfo", "Other Info")}
                    </Grid>
                    <Grid xs={12}>
                        {this.InputFieldBuilder("sac", "SAC", "select")}
                        {this.InputFieldBuilder("areaOfNeed", "Area of Need", "select")}
                        {this.InputFieldBuilder("response", "Response", "select")}
                    </Grid>
                    <Grid xs={2} sx={gridButtonStyle}>
                        {this.Button("Generate user", () => this.postStudent(this.state.currentStudent))}
                    </Grid>
                    <Grid xs={2} sx={gridButtonStyle}>
                        {this.Button("Delete user", () => (console.log("test")))}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}