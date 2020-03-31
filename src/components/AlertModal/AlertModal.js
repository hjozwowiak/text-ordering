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
  open,
  messageHead,
  messageBody,
  handleClose,
  customAction
}) => {
  const handleConfirmClick = (handleClose, customAction) => {
    if (customAction) customAction();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{messageHead}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {messageBody}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Anuluj</Button>
        <Button
          onClick={() => {
            handleConfirmClick(handleClose, customAction);
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
  open: PropTypes.bool,
  messageHead: PropTypes.string,
  messageBody: PropTypes.string,
  handleClose: PropTypes.func,
  customAction: PropTypes.func
};

export default AlertModal;
