import React from "react";
import SubpageBoxOutput from "./SubpageBoxOutput";

const DocumentOutput = ({ clientInfo, subpages }) => {
    let domain = "",
        industry = "",
        comment = "";
    if (clientInfo.domain) {
        domain = `Domena: ${clientInfo.domain}`;
    } else {
        domain = "";
    }
    if (clientInfo.industry) {
        industry = `Branża: ${clientInfo.industry}`;
    } else {
        industry = "";
    }
    if (clientInfo.comment) {
        comment = `Uwagi: ${clientInfo.comment}`;
    } else {
        comment = "";
    }

    return (
        <div className="col-md-6">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">Podstawowe informacje:</div>
                            <div className="row">{domain}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">{industry}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">{comment}</div>
                        </div>
                    </div>
                </div>
            </div>
            {subpages.map(subpage => (
                <SubpageBoxOutput
                    subpage={subpage}
                    key={`setOutput${subpage.index}`}
                />
            ))}
        </div>
    );
};

export default DocumentOutput;
