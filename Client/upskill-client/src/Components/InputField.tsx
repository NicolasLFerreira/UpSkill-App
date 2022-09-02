import { Input } from "@mui/material";
import React, { Component } from "react";

interface IProps {
    property: string,
    type: string,
    placeholder?: string,
    sx: any,
    callback: (value: string) => void
}

interface IState {

}

export default class InputField extends Component<IProps, IState>{
    input: string = "";

    constructor(props: IProps) {
        super(props);

        this.state = {

        }
    }

    render(): React.ReactNode {
        return (
            <Input
                type={this.props.type}
                placeholder={this.props.placeholder}
                sx={this.props.sx}
                onChange={(e) => this.props.callback(e.target.value)}
            />
        );
    }
}