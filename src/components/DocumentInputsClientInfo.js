import React from "react";
import PropTypes from "prop-types";
import { Card, TextField } from "@material-ui/core";

const DocumentInputsClientInfo = ({ updateClientInfo }) => {
    return (
        <Card className="Card">
            <p>Informacje o kliencie:</p>
            <TextField
                id="outlined-dense"
                label="Domena"
                margin="dense"
                color="primary"
                name="domain"
                onChange={updateClientInfo}
            />
            <TextField
                id="outlined-dense"
                label="Branża"
                margin="dense"
                color="primary"
                name="industry"
                onChange={updateClientInfo}
            />
            <TextField
                id="outlined-dense-multiline"
                label="Wstępny komentarz"
                margin="dense"
                variant="outlined"
                multiline
                name="comment"
                rowsMax="6"
                fullWidth
                onChange={updateClientInfo}
            />
        </Card>
    );
};

DocumentInputsClientInfo.propTypes = {
    clientInfo: PropTypes.object,
    updateClientInfo: PropTypes.func
};

export default DocumentInputsClientInfo;
