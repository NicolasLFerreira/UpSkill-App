import React, { Component } from "react";
import { Button, Typography, Input } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import InputField from "./InputField";
import FormSelect from "./FormSelect";
import { values } from "../../types/IStudentDataDisplay";
import IStudentData, { defaultStudentObject } from "../../types/IStudentData";
import StudentDataCrud from "../../services/StudentDataCrud";

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

interface IProps { }

interface IState {
    students: Array<IStudentData>,
    currentStudent: IStudentData,
    currentIndex: number,
    searchTitle: string
}

export default class Form extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            students: [],
            currentStudent: defaultStudentObject,
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

    postStudent(student: IStudentData) {
        console.log("to be posted:");
        console.log(student);

        StudentDataCrud.post(student)
            .then((response) => {
                console.log(response);
            })
            .catch((e: Error) => {
                console.log(e);
            })
    }

    // Assigns the changes to the state.
    registerChange = (property: string, value: string | number): void => {
        // Dynamically declares the key of an IStudentData object.
        var object: IStudentData = this.state.currentStudent;
        var key: keyof IStudentData = property as keyof IStudentData;

        // Updates the copy using the key and the given value.
        object[key] = value as never;

        this.setState({
            currentStudent: object
        });

        console.log(this.state.currentStudent);
    }

    // Components

    // Creates an input field and assigns the callback function for registering the changes.
    InputFieldBuilder(type: string, property: string, placeholder: string, items?: Array<string>) {
        return (
            type == "select" ?
                <FormSelect
                    property={property}
                    placeholder={placeholder}
                    items={items!}
                    callback={(value: number) => { this.registerChange(property, value); }}
                /> :
                <InputField
                    type={type}
                    property={property}
                    placeholder={placeholder}
                    sx={type == "text" ? gridInputStyle : gridDateStyle}
                    callback={(value: string) => { this.registerChange(property, value); }}
                />
        );
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
                        {this.InputFieldBuilder("text", "firstName", "First name")}
                        {this.InputFieldBuilder("text", "lastName", "Last name")}
                        {this.InputFieldBuilder("date", "dob", "DOB")}
                        {this.InputFieldBuilder("text", "ethnicity", "Ethnicity")}
                        {this.InputFieldBuilder("text", "pronoun", "Pronoun")}
                    </Grid>
                    <Grid xs={12}>
                        {this.InputFieldBuilder("text", "yearLevel", "Year Level")}
                        {this.InputFieldBuilder("text", "tutor", "Tutor")}
                        {this.InputFieldBuilder("text", "diagnosis", "Diagnosis")}
                        {this.InputFieldBuilder("text", "externalAgencies", "External Agencies")}
                        {this.InputFieldBuilder("text", "notes", "Notes")}
                    </Grid>
                    <Grid xs={12}>
                        {this.InputFieldBuilder("text", "links", "Links")}
                        {this.InputFieldBuilder("text", "kamarUpdates", "Kamar Updates")}
                        {this.InputFieldBuilder("text", "sacInfo", "SAC Info")}
                        {this.InputFieldBuilder("text", "otherInfo", "Other Info")}

                    </Grid>
                    <Grid xs={12}>
                        {this.InputFieldBuilder("select", "sac", "SAC", values.sac)}
                        {this.InputFieldBuilder("select", "areaOfNeed", "Area of Need", values.areaOfNeed)}
                        {this.InputFieldBuilder("select", "response", "Response", values.response)}
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