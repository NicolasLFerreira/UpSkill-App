import React from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface IPropsSelect {
    placeholder: string,
    items: Array<string>,
    callback: (value: number) => void
}

export default function FormSelect(props: IPropsSelect) {
    const [selected, setSelected] = React.useState("");
    const menuItems: Array<React.ReactNode> = props.items.map((item, index) => <MenuItem value={index}>{item}</MenuItem>);
    const handleChange = (event: SelectChangeEvent) => {
        setSelected(event.target.value);
        props.callback(parseInt(event.target.value));
    };

    return (
        <FormControl sx={{ width: "20%", m: 1 }}>
            <InputLabel>{props.placeholder}</InputLabel>
            <Select
                value={selected}
                onChange={handleChange}
                label="Selected"
            >
                {menuItems}
            </Select>
        </FormControl>
    );
}