import * as React from 'react';
import { Box, InputLabel, MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface IProps {
    items: Array<string>;
}

export default function BasicSelect(props: IProps) {
    const [age, setAge] = React.useState('');
    const menuItems: Array<React.ReactNode> = props.items.map((item, index) => <MenuItem value={index}>{item}</MenuItem>);

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <FormControl sx={{ width: "10%" }}>
            <InputLabel id="demo-simple-select-label">SAC</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
            >
                {menuItems}
            </Select>
        </FormControl>
    );
}