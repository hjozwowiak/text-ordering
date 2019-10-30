import React from "react";
import PropTypes from "prop-types";
import SubpageBoxOutput from "./SubpageBoxOutput";

const DocumentOutput = ({ clientInfo, subpages, orderTypes }) => {
    let orderTitle = "",
        industry = "",
        comment = "";
    if (clientInfo.domain) {
        orderTitle = `${clientInfo.domain} - teksty na stronę`;
    } else {
        orderTitle = "";
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
            <p>Podstawowe informacje:</p>
            <hr />
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
            <p>{industry}</p>
            <br />
            <p>{comment}</p>
            {subpages.map((subpage, index) => (
                <SubpageBoxOutput
                    subpage={subpage}
                    orderTypes={orderTypes}
                    index={index}
                    key={subpage.id}
                />
            ))}
        </div>
    );
};

DocumentOutput.propTypes = {
    clientInfo: PropTypes.object,
    subpages: PropTypes.array,
    orderTypes: PropTypes.array
};

export default DocumentOutput;
