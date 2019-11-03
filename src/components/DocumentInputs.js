import React from "react";
import PropTypes from "prop-types";
import "../style/DocumentInputs.scss";
import { Button } from "@material-ui/core";
import DocumentInputsClientInfo from "./DocumentInputsClientInfo";
import SubpageBoxInput from "./SubpageBoxInput";

const DocumentInputs = ({
    updateClientInfo,
    subpages,
    handleAddButtonClick,
    handleSubpageBoxChange,
    orderTypes
}) => {
    return (
        <div className="DocumentInputs col-md-6 col-lg-5">
            <DocumentInputsClientInfo updateClientInfo={updateClientInfo} />
            <hr />
            {subpages.map((subpage, index) => (
                <SubpageBoxInput
                    subpage={subpage}
                    key={subpage.id}
                    index={index}
                    handleSubpageBoxChange={handleSubpageBoxChange}
                    orderTypes={orderTypes}
                />
            ))}
            <div className="container--button">
                <Button
                    onClick={handleAddButtonClick}
                    variant="contained"
                    color="primary"
                >
                    Dodaj podstronę
                </Button>
            </div>
        </div>
    );
};

DocumentInputs.propTypes = {
    updateClientInfo: PropTypes.func,
    subpages: PropTypes.array,
    handleAddButtonClick: PropTypes.func,
    handleSubpageBoxChange: PropTypes.func,
    orderTypes: PropTypes.array
};

export default DocumentInputs;
