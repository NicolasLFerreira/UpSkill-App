import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 96;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface IProps {
    callback: (values: Array<string>) => void,
    items: Array<string>,
    label: string,
}

export default function MultipleSelectCheckmarks(props: IProps) {
    const [state, setState] = React.useState<Array<string>>([props.items[1], props.items[2]]);

    const handleChange = (event: SelectChangeEvent<typeof state>) => {
        const {
            target: { value },
        } = event;
        setState(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value,
        );
        props.callback(typeof value === "string" ? value.split(",") : value);
    };

    return (
        <FormControl>
            <InputLabel>{props.label}</InputLabel>
            <Select
                multiple
                sx={{ m: 1 }}
                value={state}
                onChange={handleChange}
                input={<OutlinedInput label={props.label} />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
            >
                {props.items.map((item) => (
                    <MenuItem key={item} value={item}>
                        <Checkbox checked={state.indexOf(item) > -1} />
                        <ListItemText primary={item} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}