import React from "react";
import PropTypes from "prop-types";
import SubpageBoxOutput from "./SubpageBoxOutput";
import { Card } from "@material-ui/core";

const DocumentOutput = ({
    clientInfo,
    subpages,
    metaDescLength,
    orderTypes
}) => {
    let orderTitle = "",
        comment = "";
    if (clientInfo.domain) {
        orderTitle = `${clientInfo.domain} - teksty na stronę`;
    } else {
        orderTitle = "";
    }
    if (clientInfo.comment) {
        comment = `Uwagi: ${clientInfo.comment}`;
    } else {
        comment = "";
    }

    let charactersToWrite = 0;
    if (subpages.length > 1) {
        charactersToWrite = subpages
            .map(x => (x.charactersToWrite === "" ? 0 : x.charactersToWrite))
            .reduce((x, y) => parseInt(x) + parseInt(y));
    } else if (subpages.length === 1) {
        charactersToWrite = subpages[0].charactersToWrite;
    }

    return (
        <div className="DocumentOutput col-md-6 col-lg-7">
            <Card className="Card container--generalInfo">
                <h1>Podstawowe informacje:</h1>
                <p>
                    <strong>Nazwa zadania: </strong>
                    {orderTitle}
                </p>
                <p>
                    <strong>Liczba znaków: </strong>
                    {charactersToWrite}
                </p>
                <p>
                    <strong>Liczba tekstów: </strong>
                    {subpages.length}
                </p>
            </Card>
            <hr />
            <Card className="Card container-scrollable">
                <span>
                    <strong>Branża klienta:</strong> {clientInfo.industry}
                </span>
                <span>{comment}</span>
                <br />
                <span>---</span>
                {subpages.map((subpage, index) => (
                    <SubpageBoxOutput
                        subpage={subpage}
                        metaDescLength={metaDescLength}
                        orderTypes={orderTypes}
                        index={index}
                        key={subpage.id}
                    />
                ))}
                <br />
                <br />
                <span>
                    W razie pytań lub wątpliwości proszę o kontakt w komentarzu.
                </span>
            </Card>
        </div>
    );
};

DocumentOutput.propTypes = {
    clientInfo: PropTypes.object,
    subpages: PropTypes.array,
    orderTypes: PropTypes.array,
    metaDescLength: PropTypes.array
};

export default DocumentOutput;
