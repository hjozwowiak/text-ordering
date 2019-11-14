import React from "react";
import PropTypes from "prop-types";
import "../style/DocumentInputs.scss";
import { Button } from "@material-ui/core";
import DocumentInputsClientInfo from "./DocumentInputsClientInfo";
import SubpageBoxInput from "./SubpageBoxInput";
import TopBar from "./TopBar";

const DocumentInputs = ({
    handleClearButtonClick,
    settings,
    updateMetaDescLength,
    handleChangeThemeTypeSwitch,
    updateClientInfo,
    subpages,
    handleAddButtonClick,
    handleSubpageBoxChange,
    orderTypes
}) => {
    return (
        <div className="DocumentInputs col-md-6 col-lg-5">
            <TopBar
                handleClearButtonClick={handleClearButtonClick}
                settings={settings}
                handleChangeThemeTypeSwitch={handleChangeThemeTypeSwitch}
                updateMetaDescLength={updateMetaDescLength}
            />
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
    settings: PropTypes.object,
    updateMetaDescLength: PropTypes.func,
    handleClearButtonClick: PropTypes.func,
    updateClientInfo: PropTypes.func,
    handleChangeThemeTypeSwitch: PropTypes.func,
    subpages: PropTypes.array,
    handleAddButtonClick: PropTypes.func,
    handleSubpageBoxChange: PropTypes.func,
    orderTypes: PropTypes.array
};

export default DocumentInputs;
