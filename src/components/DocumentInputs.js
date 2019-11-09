import React from "react";
import PropTypes from "prop-types";
import "../style/DocumentInputs.scss";
import { Button, ButtonGroup } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import DocumentInputsClientInfo from "./DocumentInputsClientInfo";
import SubpageBoxInput from "./SubpageBoxInput";

const DocumentInputs = ({
    updateClientInfo,
    subpages,
    handleAddButtonClick,
    handleClearButtonClick,
    handleSubpageBoxChange,
    orderTypes
}) => {
    return (
        <div className="DocumentInputs col-md-6 col-lg-5">
            <div className="topBar">
                <div className="topBar--options row">
                    <h1>Template generator</h1>
                    <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                        color="secondary"
                    >
                        <Button onClick={handleClearButtonClick}>
                            Wyczyść pola
                        </Button>
                        <Button>
                            <FontAwesomeIcon icon={faCog} />
                        </Button>
                    </ButtonGroup>
                </div>
                <div className="topBar--settings row"></div>
            </div>
            <div className="container--inputsList">
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
