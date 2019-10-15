import React from "react";
import InputText from "./inputs/InputText";
import TextArea from "./inputs/TextArea";

const DocumentInputsClientInfo = ({
    clientInfo,
    updateClientInfo
    // updateClientInfo_domain,
    // updateClientInfo_industry,
    // updateClientInfo_comment
}) => {
    return (
        <div>
            <div className="row">Informacje o kliencie:</div>
            <div className="row">
                <InputText
                    value={clientInfo.domain}
                    placeholder="Domena"
                    onChange={updateClientInfo}
                    name="domain"
                />
            </div>
            <div className="row">
                <InputText
                    value={clientInfo.industry}
                    placeholder="Branża"
                    onChange={updateClientInfo}
                    name="industry"
                />
            </div>
            <div className="row">
                <TextArea
                    calue={clientInfo.comment}
                    placeholder="Wstępny komentarz"
                    onChange={updateClientInfo}
                    name="comment"
                />
            </div>
        </div>
    );
};

export default DocumentInputsClientInfo;
