import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Snackbar } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

import { copyToClipboard } from "../../shared/utils/copyToClipboard";

import SubpageBoxOutput from "../SubpageBoxOutput";
import Card from "../Card/Card";

import "./DocumentOutput.scss";

const DocumentOutput = ({ clientInfo, subpages, metaDescLength }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const snackbarQueueRef = useRef([]);

    const copyOpenSnackbar = (event, customId, message) => {
        copyToClipboard(event, customId);
        handleOpenSnackbarClick(message);
    };

    const processSnackbarQueue = () => {
        if (snackbarQueueRef.current.length > 0) {
            setSnackbarMessage(snackbarQueueRef.current.shift());
            setSnackbarOpen(true);
        }
    };

    const handleOpenSnackbarClick = message => {
        snackbarQueueRef.current.push(message);

        if (snackbarOpen) {
            setSnackbarOpen(false);
        } else {
            processSnackbarQueue();
        }
    };

    const handleSnackbarExited = () => {
        processSnackbarQueue();
    };

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
            <Card classList={["DocumentOutput__generalInfoContainer"]}>
                <h1>Podstawowe informacje:</h1>
                <p className="generalInfoContainer__paragraph">
                    <span className="paragraph_bold">Nazwa zadania: </span>
                    {"  "}
                    <span
                        className="DocumentOutput__textToCopy"
                        onClick={event => {
                            copyOpenSnackbar(
                                event,
                                null,
                                "Skopiowano nazwę zadania do schowka!"
                            );
                        }}
                    >
                        {clientInfo.domain &&
                            `${clientInfo.domain} - teksty na stronę`}
                    </span>
                </p>
                <p className="generalInfoContainer__paragraph">
                    <span className="paragraph_bold">Liczba znaków: </span>
                    {"  "}
                    <span
                        className="DocumentOutput__textToCopy"
                        onClick={event => {
                            copyOpenSnackbar(
                                event,
                                null,
                                "Skopiowano liczbę znaków do schowka!"
                            );
                        }}
                    >
                        {charactersToWrite}
                    </span>
                </p>
                <p className="generalInfoContainer__paragraph">
                    <span className="paragraph_bold">Liczba tekstów: </span>
                    {"  "}
                    <span
                        className="DocumentOutput__textToCopy"
                        onClick={event => {
                            copyOpenSnackbar(
                                event,
                                null,
                                "Skopiowano liczbę tekstów do schowka!"
                            );
                        }}
                    >
                        {subpages.length}
                    </span>
                </p>
            </Card>
            <hr />
            <Card classList={["container-scrollable"]} id="orderOutput">
                <Button
                    className="button--copy"
                    variant="contained"
                    onClick={event => {
                        copyOpenSnackbar(
                            event,
                            "orderOutput",
                            "Skopiowano zawartość zamówienia do schowka!"
                        );
                    }}
                >
                    <FontAwesomeIcon icon={faCopy} />
                </Button>
                <span>
                    <strong>Branża klienta:</strong> {clientInfo.industry}
                </span>
                <span>
                    {clientInfo.comment && `Uwagi: ${clientInfo.comment}`}
                </span>
                <br />
                <span>---</span>
                {subpages.map((subpage, index) => (
                    <SubpageBoxOutput
                        subpage={subpage}
                        metaDescLength={metaDescLength}
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
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackbarOpen(false)}
                onExited={handleSnackbarExited}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                message={snackbarMessage}
            />
        </div>
    );
};

DocumentOutput.propTypes = {
    clientInfo: PropTypes.object,
    subpages: PropTypes.array,
    metaDescLength: PropTypes.array
};

export default DocumentOutput;
