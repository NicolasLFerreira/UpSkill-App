import { Input } from "@mui/material";
import React, { Component } from "react";

interface IProps {
    type: string,
    property: string,
    placeholder?: string,
    sx: any,
    callback: (value: string) => void
}

export default class InputField extends Component<IProps>{
    input: string = "";

    constructor(props: IProps) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <Input
                type={this.props.type}
                placeholder={this.props.placeholder}
                sx={this.props.sx}
                onChange={(event) => this.props.callback(event.target.value)}
            />
        );
    }
}