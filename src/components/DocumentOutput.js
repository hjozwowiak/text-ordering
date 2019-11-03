import React from "react";
import PropTypes from "prop-types";
import SubpageBoxOutput from "./SubpageBoxOutput";
import { Card } from "@material-ui/core";

const DocumentOutput = ({ clientInfo, subpages, orderTypes }) => {
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

    return (
        <div className="DocumentOutput col-md-6 col-lg-7">
            <Card className="Card container--generalInfo">
                <h1>Podstawowe informacje:</h1>
                <p>
                    <strong>Nazwa zadania: </strong>
                    {orderTitle}
                </p>
                <p>
                    <strong>Liczba znaków: </strong>-
                </p>
                <p>
                    <strong>Liczba tekstów: </strong>
                    {subpages.length}
                </p>
            </Card>
            <hr />
            <Card className="Card container-scrollable">
                <p>
                    <strong>Branża klienta:</strong> {clientInfo.industry}
                </p>
                <p>{comment}</p>
                <br />
                <p>---</p>
                <br />
                {subpages.map((subpage, index) => (
                    <SubpageBoxOutput
                        subpage={subpage}
                        orderTypes={orderTypes}
                        index={index}
                        key={subpage.id}
                    />
                ))}
                <br />
                <p>
                    W razie pytań lub wątpliwości proszę o kontakt w komentarzu.
                </p>
            </Card>
        </div>
    );
};

DocumentOutput.propTypes = {
    clientInfo: PropTypes.object,
    subpages: PropTypes.array,
    orderTypes: PropTypes.array
};

export default DocumentOutput;
