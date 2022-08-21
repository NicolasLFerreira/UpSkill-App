import React, { Fragment } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface IProps {
    stuff: number[];
}

function RowGenerator(props: IProps) {

    var size: number = 12 / props.stuff.length;
    var componentArray: React.ReactNode[] = [];

    for (let index = 0; index < props.stuff.length; index++) {
        componentArray.push(
            <Grid item xs={size}>
                <Item>
                    {props.stuff[index]} stuff
                </Item>
            </Grid>);
    }

    return (
        <React.Fragment>
            {componentArray}
        </React.Fragment>
    )
}

export default function GridScreen() {
    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid container item spacing={3}>
                        <RowGenerator stuff={[0, 1, 2]} />
                    </Grid>
                    <Grid container item spacing={3}>
                        <RowGenerator stuff={[2, 2]} />
                    </Grid>
                    <Grid container item spacing={3}>
                        <RowGenerator stuff={[3, 3, 3]} />
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}