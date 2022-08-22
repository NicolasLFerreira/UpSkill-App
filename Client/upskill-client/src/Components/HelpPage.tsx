import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";

export default function HelpScreen() {
    return (
        <Fragment>
            <Box>
                <Typography>
                    This is the help page of the website. Most of your questions will be answered here.
                </Typography>
                <Typography>
                    click buttons for stuff to happen
                </Typography>
            </Box>
        </Fragment>
    );
}