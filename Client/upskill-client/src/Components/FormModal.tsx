import * as React from 'react';
import { Box, Button, Typography, Grid, Modal, Input } from '@mui/material';

const boxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "75%",
    width: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const gridItemStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center"
}

function ModalButton(text: string, callback: () => void, size: number) {
    return (
        <Grid item xs={size} sx={gridItemStyle}>
            <Button variant="contained" onClick={() => callback()}>
                {text}
            </Button>
        </Grid>
    );
}

interface IProps {
    createStudentCallback: () => void;
}

export default function FormModal(props: IProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Open Student Form</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <Grid container>
                        <Grid item>
                            <Input type="search" placeholder="Search for student" />
                        </Grid>
                        <Grid item>
                            <Grid container sx={{ m: 1 }}>
                                <Grid item>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Student name placeholder
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Create, read, update, or delte a student record.
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container sx={{ m: 1 }}>
                                <Grid item>
                                    <Input type="text" placeholder="First name" sx={{ mx: 1 }} />
                                    <Input type="text" placeholder="Last name" sx={{ mx: 1 }} />
                                    <Input type="date" sx={{ mx: 1 }} />
                                </Grid>
                            </Grid>
                            <Grid container sx={{ m: 1 }}>
                                {ModalButton("Generate Users", props.createStudentCallback, 4)}
                            </Grid>
                            <Grid container>

                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}