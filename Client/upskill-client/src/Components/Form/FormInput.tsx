import React, { Component } from "react";
import { Input, TextField } from "@mui/material";

interface IProps {
    type: string,
    property: string,
    placeholder?: string,
    sx: any,
    callback: (value: string) => void
}

export default function FormInput(props: IProps) {

    return (
        <TextField
            type={props.type}
            sx={props.sx}
            variant="outlined"
            defaultValue={props.placeholder}
            label={props.type != "date" ? props.placeholder : ""}
            onChange={(event) => props.callback(event.target.value)}
        />
    );
}