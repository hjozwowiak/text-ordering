import React from "react";
import PropTypes from "prop-types";
import SubpageBoxOutput from "./SubpageBoxOutput";

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
        <div className="col-md-6">
            <p>
                <strong>Podstawowe informacje:</strong>
            </p>
            <br />
            <p>
                <b>Nazwa zadania: </b>
                {orderTitle}
            </p>
            <p>
                <b>Liczba znaków: </b>
            </p>
            <p>
                <b>Liczba tekstów: </b>
                {subpages.length}
            </p>
            <hr />
            <br />
            <p>Branża klienta: {clientInfo.industry}</p>
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
            <p>W razie pytań lub wątpliwości proszę o kontakt w komentarzu.</p>
        </div>
    );
};

DocumentOutput.propTypes = {
    clientInfo: PropTypes.object,
    subpages: PropTypes.array,
    orderTypes: PropTypes.array
};

export default DocumentOutput;
