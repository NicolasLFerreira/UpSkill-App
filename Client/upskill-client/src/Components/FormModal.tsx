import * as React from 'react';
import { Box, Button, Typography, Modal, Input, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import BasicSelect from './BasicSelect';
import { values } from '../types/IStudentDataDisplay';

const boxStyle = {
    flex: 1,
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

const gridButtonStyle = {
    justifyContent: "left",
    m: 1
}

const gridInputStyle = {
    m: 1,
}

function ModalButton(text: string, callback: () => void) {
    return (
        <Button variant="contained" onClick={() => callback()}>
            {text}
        </Button>
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
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid>
                            <Input type="search" placeholder="Search for student" />
                        </Grid>
                        <Grid>
                            <Grid xs={12}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Student name placeholder
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Create, read, update, or delte a student record.
                                </Typography>
                            </Grid>
                            <Grid xs={12}>
                                <Input type="text" placeholder="First name" sx={gridInputStyle} />
                                <Input type="text" placeholder="Last name" sx={gridInputStyle} />
                                <Input type="date" sx={gridInputStyle} />
                            </Grid>
                            <Grid xs={12}>
                                <Input type="text" placeholder="Notes" sx={gridInputStyle} />
                                <Input type="text" placeholder="Pronouns" sx={gridInputStyle} />
                                <BasicSelect items={values.areaOfNeed} />
                            </Grid>
                            <Grid xs={2} sx={gridButtonStyle}>
                                {ModalButton("Generate user", props.createStudentCallback)}
                            </Grid>
                            <Grid xs={2} sx={gridButtonStyle}>
                                {ModalButton("Delete user", () => (console.log("shit")))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div >
    );
}