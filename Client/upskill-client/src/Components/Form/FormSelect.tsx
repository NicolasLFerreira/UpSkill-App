import React, { useState, useEffect } from "react";
import { MenuItem, TextField } from "@mui/material";

interface IProps {
    value: number,
    label: string,
    items: Array<string>,
    callback: (value: number) => void
}

export default function FormSelect(props: IProps) {
    const [state, setState] = useState({ value: -1 })
    // const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void

    const handleChange = (event: any) => {
        var value: number = parseInt(event.target.value.toString());
        setState({ value: event.target.value });
        props.callback(value);
    }

    // useEffect(() => {
    //     setState((state) => ({ ...state, value: props.value }));
    // }, [props.value])

    const menuItems: Array<React.ReactNode> = props.items.map((item, index) => {
        return <MenuItem value={index}>{item}</MenuItem>
    });

    return (
        <TextField
            select
            sx={{ width: "20%", m: 1 }}
            value={state.value}
            label={props.label}
            onChange={handleChange}
        >
            {menuItems}
        </TextField>
    );
}