import React from "react";
import PropTypes from "prop-types";
import "../style/DocumentInputs.scss";
import { Button } from "@material-ui/core";
import DocumentInputsClientInfo from "./DocumentInputsClientInfo";
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
  onAddButtonClick,
  onDuplicateButtonClick,
  handleRemoveSubpageButtonClick,
  handleSubpageBoxChange,
  runModal,
  handleToggleFoldAllButtonClick,
  createSubpageObject,
  updateWholeSubpagesObject,
}) => {
  return (
    <div className="DocumentInputs col-md-6 col-lg-5">
      <TopBar
        onClearButtonClick={handleClearButtonClick}
        settings={settings}
        onThemeTypeSwitchChange={handleChangeThemeTypeSwitch}
        onMetaDescLengthChange={updateMetaDescLength}
        topBarImgName={topBarImgName}
        onToggleFoldAllButtonClick={handleToggleFoldAllButtonClick}
        runModal={runModal}
        createSubpageObject={createSubpageObject}
        updateWholeSubpagesObject={updateWholeSubpagesObject}
      />
      <div className="container--inputsList">
        <DocumentInputsClientInfo
          clientInfo={clientInfo}
          updateClientInfo={updateClientInfo}
        />
        <hr />
        {subpages.map((subpage, index) => (
          <SubpageBoxInput
            subpage={subpage}
            key={subpage.id}
            index={index}
            handleRemoveSubpageButtonClick={handleRemoveSubpageButtonClick}
            handleSubpageBoxChange={handleSubpageBoxChange}
            onDuplicateButtonClick={onDuplicateButtonClick}
          />
        ))}
        <div className="container--button">
          <Button
            onClick={onAddButtonClick}
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
  onAddButtonClick: PropTypes.func,
  onDuplicateButtonClick: PropTypes.func,
  handleSubpageBoxChange: PropTypes.func,
  runModal: PropTypes.func,
  createSubpageObject: PropTypes.func,
  updateSubpages: PropTypes.func,
};

export default DocumentInputs;
