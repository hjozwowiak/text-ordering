import React, { Component } from "react";
import PropTypes from "prop-types";
import DocumentInputsClientInfo from "./DocumentInputsClientInfo";
import SubpageBoxInput from "./SubpageBoxInput";

class DocumentInputs extends Component {
    render() {
        const {
            clientInfo,
            updateClientInfo,
            subpages,
            handleAddButtonClick,
            handleSubpageBoxChange
        } = this.props;
        return (
            <div className="col-md-6">
                <DocumentInputsClientInfo
                    clientInfo={clientInfo}
                    updateClientInfo={updateClientInfo}
                />
                {subpages.map(subpage => (
                    <SubpageBoxInput
                        subpage={subpage}
                        key={`setInput${subpage.index}`}
                        onChange={handleSubpageBoxChange}
                    />
                ))}
                <hr />
                <button onClick={handleAddButtonClick}>+</button> Dodaj nową
                podstronę
            </div>
        );
    }
}

DocumentInputs.propTypes = {
    subpages: PropTypes.array,
    handleAddButtonClick: PropTypes.func,
    handleSubpageBoxChange: PropTypes.func
};

export default DocumentInputs;
