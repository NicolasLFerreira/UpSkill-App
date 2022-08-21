import React, { Fragment, ReactNode } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, SvgIconTypeMap } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowUpward, Home, SvgIconComponent } from '@mui/icons-material';

interface INavButtonProps {
    text: string,
    icon?: ReactNode,
    path?: string
}

function NavButton(props: INavButtonProps) {
    return (
        <Button
            variant="contained"
            component={RouterLink}
            to={
                props.path ??
                props.text.toLocaleLowerCase()
            } sx={{
                mr: 2,
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "1rem"
            }}
        >
            <>{props.icon ?? props.text}</>
        </Button >
    )
}

export default function NavigationBar() {
    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h5" sx={{ mr: 2, fontSize: "2rem" }}>
                            UpSkill
                        </Typography>
                        <NavButton text="Home" icon={<Home />} />
                        <NavButton text="Database" />
                        <NavButton text="Form" />
                        <NavButton text="Help" />
                    </Toolbar>
                </AppBar>
                <Toolbar />
            </Box>
        </Fragment>
    )
}