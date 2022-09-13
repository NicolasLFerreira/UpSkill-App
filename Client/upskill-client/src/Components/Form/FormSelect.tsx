import React from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface IPropsSelect {
    placeholder: string,
    value: string,
    items: Array<string>,
    callback: (value: number) => void
}

export default function FormSelect(props: IPropsSelect) {
    const [selected, setSelected] = React.useState("test");
    const menuItems: Array<React.ReactNode> = props.items.map((item, index) => <MenuItem value={index}>{item}</MenuItem>);

    const handleChange = (event: SelectChangeEvent) => {
        setSelected(event.target.value);
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