import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

import Card from "./Card/Card";

const DocumentInputsClientInfo = ({ clientInfo, updateClientInfo }) => {
  return (
    <Card>
      <p className="cardLabel">Informacje o kliencie:</p>
      <TextField
        id="outlined-dense"
        label="Domena"
        margin="dense"
        color="primary"
        name="domain"
        fullWidth
        value={clientInfo.domain}
        onChange={updateClientInfo}
      />
      <TextField
        id="outlined-dense"
        label="Branża"
        margin="dense"
        color="primary"
        name="industry"
        fullWidth
        value={clientInfo.industry}
        onChange={updateClientInfo}
      />
      <TextField
        id="outlined-dense-multiline"
        label="Ogólne informacje do zamówienia"
        margin="dense"
        variant="outlined"
        multiline
        name="comment"
        rowsMax="6"
        fullWidth
        value={clientInfo.comment}
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
