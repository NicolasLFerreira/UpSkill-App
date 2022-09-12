import React, { Component } from "react";
import { Input, TextField } from "@mui/material";

interface IProps {
    type: string,
    value?: string | number,
    label?: string,
    sx: any,
    callback: (value: string) => void
}

interface IState {
    value?: string | number
}

export function FormInpu(props: IProps) {

    return (
        <TextField
            type={props.type}
            label={props.type != "date" ? props.label : ""}
            defaultValue={props.value}
            sx={props.sx}
            variant="outlined"
            onChange={(event) => props.callback(event.target.value)}
        />
    );
}

export default class FormInput extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            value: this.props.value
        }
    }

    render(): React.ReactNode {
        return (
            <TextField
                type={this.props.type}
                label={this.props.type != "date" ? this.props.label : ""}
                // defaultValue={this.state.value}
                sx={this.props.sx}
                variant="outlined"
                onChange={(event) => this.props.callback(event.target.value)}
                inputProps={{defaultValue: this.state.value}}
            />
        );
    }
}