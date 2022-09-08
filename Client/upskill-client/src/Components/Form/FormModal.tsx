import React, { Component } from "react";
import { Container, Button, Typography, Modal, Input, SelectChangeEvent, MenuItem, InputLabel, Select, FormControl, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import InputField from "./InputField";
import IStudentData from "../../types/IStudentData";
import { selectOptions as values, defaultStudentObject } from "../../utility/StudentDataUtility";
import Form from "./Form";

// Styles
const boxStyle = {
    flex: 1,
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "75%",
    width: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const gridButtonStyle = {
    justifyContent: "left",
    m: 1
}

const gridInputStyle = {
    m: 1
}

const gridDateStyle = {
    width: "19.5%"
}

// Boilerplate interfaces

interface IProps {
    createStudentCallback: (student: IStudentData) => void;
}

interface IState {
    open: boolean,
    currentStudent: IStudentData
}

export default class FormModal extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            open: true,
            currentStudent: defaultStudentObject
        }
    }

    // Handling the input from the modal
    registerChange = (property: string, value: string | number): void => {
        // Dynamically selects an item from the array
        var object: IStudentData = this.state.currentStudent;
        var key: keyof IStudentData = property as keyof IStudentData;

        // Updated the student object with the new data to the selected property
        object[key] = value as never;
        this.setState({
            currentStudent: object
        });

        console.log(this.state.currentStudent);
    }

    inputFieldBuilder(type: string, property: string, placeholder: string, items?: Array<string>) {
        return (
            // <span sx={type == "date" ? {m:5} : {}}>
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
            // </span>
        );
    }

    // Default button for the modal page
    ModalButton(text: string, callback: () => void) {
        return (
            <Button variant="contained" onClick={() => callback()}>
                {text}
            </Button>
        );
    }

    render(): React.ReactNode {
        const handleOpen = () => this.setState({ open: true });
        const handleClose = () => this.setState({ open: false });

        return (
            <div>
                <Button onClick={handleOpen}>Open Student Form</Button>
                <Modal
                    open={this.state.open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ minWidth: "85%" }}
                >
                    <Container sx={boxStyle}>
                        <Form />
                    </Container>
                </Modal>
            </div >
        );
    }
}

interface IPropsSelect {
    property: string,
    placeholder: string,
    items: Array<string>,
    callback: (value: number) => void
}

function FormSelect(props: IPropsSelect) {
    const [selected, setSelected] = React.useState("");
    const menuItems: Array<React.ReactNode> = props.items.map((item, index) => <MenuItem value={index}>{item}</MenuItem>);

    const handleChange = (event: SelectChangeEvent) => {
        setSelected(event.target.value as string);
        props.callback(parseInt(event.target.value));
    };

    return (
        <FormControl sx={{ width: "20%", m: 1 }}>
            <InputLabel id="demo-simple-select-label">{props.placeholder}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selected}
                label="Selected"
                onChange={handleChange}
            >
                {menuItems}
            </Select>
        </FormControl>
    );
}