import * as React from 'react';
import { Box, Button, Typography, Modal, Grid } from '@mui/material';
import IStudentData from '../types/IStudentData';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ModalButton(text: string, callback: () => void, size: number) {
    return (
        <Grid item xs={size} sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
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
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    <Grid container>
                        {ModalButton("Generate Users", props.createStudentCallback, 4)}
                    </Grid>
                    <Grid container>

                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}