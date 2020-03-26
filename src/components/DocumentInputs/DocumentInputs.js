import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

import ClientInfo from "./ClientInfo/ClientInfo";
import SubpageBox from "./SubpageBox/SubpageBox";
import TopBar from "../TopBar/TopBar";

import "./DocumentInputs.scss";

const DocumentInputs = ({
    clientInfo,
    onAddButtonClick,
    onClearButtonClick,
    onClientInfoChange,
    onMetaDescLengthChange,
    onRemoveSubpageButtonClick,
    onSubpageBoxChange,
    onThemeTypeSwitchChange,
    settings,
    subpages,
    topBarImgName
}) => (
    <div className="DocumentInputs col-md-6 col-lg-5">
        <TopBar
            onClearButtonClick={onClearButtonClick}
            onMetaDescLengthChange={onMetaDescLengthChange}
            onThemeTypeSwitchChange={onThemeTypeSwitchChange}
            settings={settings}
            topBarImgName={topBarImgName}
        />
        <div>
            <ClientInfo
                clientInfo={clientInfo}
                onClientInfoChange={onClientInfoChange}
            />
            <hr />
            {subpages.map((subpage, index) => (
                <SubpageBox
                    handleRemoveSubpageButtonClick={onRemoveSubpageButtonClick}
                    handleSubpageBoxChange={onSubpageBoxChange}
                    index={index}
                    key={subpage.id}
                    subpage={subpage}
                />
            ))}
            <div className="DocumentInputs__button">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onAddButtonClick}
                >
                    Dodaj podstronę
                </Button>
            </div>
        </div>
    </div>
);

DocumentInputs.propTypes = {
    settings: PropTypes.object,
    updateMetaDescLength: PropTypes.func,
    handleClearButtonClick: PropTypes.func,
    clientInfo: PropTypes.object,
    updateClientInfo: PropTypes.func,
    topBarImgName: PropTypes.string,
    handleChangeThemeTypeSwitch: PropTypes.func,
    subpages: PropTypes.array,
    handleAddButtonClick: PropTypes.func,
    handleSubpageBoxChange: PropTypes.func
};

export default DocumentInputs;
