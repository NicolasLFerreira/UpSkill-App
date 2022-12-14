import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";

interface IProps {
    value: number,
    label: string,
    items: Array<string>,
    callback: (value: number) => void
}

export default function FormSelect(props: IProps) {
    const [state, setState] = useState({ value: 0 })
    // const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void

    const handleChange = (event: any) => {
        var value: number = parseInt(event.target.value.toString());
        setState({ value: event.target.value });
        props.callback(value);
    }

    useEffect(() => {
        setState((state) => ({ ...state, value: props.value }));
    }, [props.value]);

    const menuItems: Array<React.ReactNode> = props.items.map((item, index) => {
        return <MenuItem value={index}>{item}</MenuItem>
    });

    return (
        <FormControl sx={{ width: "100%" }}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                input={<OutlinedInput label={props.label} />}
                value={state.value}
                onChange={handleChange}
            >
                {menuItems}
            </Select>
        </FormControl>
    );
}