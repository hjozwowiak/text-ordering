import React from "react";
import PropTypes from "prop-types";
import "../style/DocumentInputs.scss";
import { Button } from "@material-ui/core";
import ClientInfo from "./ClientInfo/ClientInfo";
import SubpageBoxInput from "./SubpageBoxInput";
import TopBar from "./TopBar/TopBar";

const DocumentInputs = ({
    handleClearButtonClick,
    settings,
    updateMetaDescLength,
    handleChangeThemeTypeSwitch,
    clientInfo,
    updateClientInfo,
    topBarImgName,
    subpages,
    handleAddButtonClick,
    handleRemoveSubpageButtonClick,
    handleSubpageBoxChange
}) => {
    return (
        <div className="DocumentInputs col-md-6 col-lg-5">
            <TopBar
                onClearButtonClick={handleClearButtonClick}
                settings={settings}
                onThemeTypeSwitchChange={handleChangeThemeTypeSwitch}
                onMetaDescLengthChange={updateMetaDescLength}
                topBarImgName={topBarImgName}
            />
            <div className="container--inputsList">
                <ClientInfo
                    clientInfo={clientInfo}
                    onClientInfoChange={updateClientInfo}
                />
                <hr />
                {subpages.map((subpage, index) => (
                    <SubpageBoxInput
                        subpage={subpage}
                        key={subpage.id}
                        index={index}
                        handleRemoveSubpageButtonClick={
                            handleRemoveSubpageButtonClick
                        }
                        handleSubpageBoxChange={handleSubpageBoxChange}
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
    clientInfo: PropTypes.object,
    updateClientInfo: PropTypes.func,
    topBarImgName: PropTypes.string,
    handleChangeThemeTypeSwitch: PropTypes.func,
    subpages: PropTypes.array,
    handleAddButtonClick: PropTypes.func,
    handleSubpageBoxChange: PropTypes.func
};

export default DocumentInputs;
