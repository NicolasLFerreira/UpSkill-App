import { Box, AppBar, Toolbar, Typography, Button, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowUpward } from '@mui/icons-material';

interface INavButtonProps {
    text: string
    path?: string
}

function NavButton(props: INavButtonProps) {
    return (
        <Button variant="contained" component={RouterLink} to={props.path ?? props.text.toLowerCase()} sx={{ mr: 2, color: "#ffffff", textDecoration: "none" }}>
            {props.text}
        </Button>
    )
}

export default function NavigationBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ mr: 2 }}>
                        <ArrowUpward /> UpSkill
                    </Typography>
                    <NavButton text="Home" />
                    <NavButton text="Database" />
                    <NavButton text="Help" />
                </Toolbar>
            </AppBar>
        </Box>
    )
}