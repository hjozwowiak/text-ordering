import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

import Card from "../Card/Card";

const ClientInfo = ({ clientInfo, onClientInfoChange }) => {
    return (
        <Card>
            <p>Informacje o kliencie:</p>
            <TextField
                id="outlined-dense"
                label="Domena"
                margin="dense"
                color="primary"
                name="domain"
                fullWidth
                value={clientInfo.domain}
                onChange={onClientInfoChange}
            />
            <TextField
                id="outlined-dense"
                label="Branża"
                margin="dense"
                color="primary"
                name="industry"
                fullWidth
                value={clientInfo.industry}
                onChange={onClientInfoChange}
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
                value={clientInfo.comment}
                onChange={onClientInfoChange}
            />
        </Card>
    );
};

ClientInfo.propTypes = {
    clientInfo: PropTypes.shape({
        comment: PropTypes.string,
        domain: PropTypes.string,
        industry: PropTypes.string
    }),
    onClientInfoChange: PropTypes.func
};

export default ClientInfo;
