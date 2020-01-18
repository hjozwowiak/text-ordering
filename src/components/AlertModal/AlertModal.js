import React from "react";
import PropTypes from "prop-types";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";

const AlertModal = ({
    isOpen,
    messageHeader,
    messageBody,
    onClose,
    onAccept
}) => {
    const handleConfirmClick = (handleClose, handleAccept) => {
        if (handleAccept) handleAccept();
        handleClose();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{messageHeader}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {messageBody}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Anuluj</Button>
                <Button
                    onClick={() => {
                        handleConfirmClick(onClose, onAccept);
                    }}
                    color="primary"
                    autoFocus
                >
                    Potwierdzam
                </Button>
            </DialogActions>
        </Dialog>
    );
};

AlertModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    messageHeader: PropTypes.string,
    messageBody: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onAccept: PropTypes.func
};

export default AlertModal;
