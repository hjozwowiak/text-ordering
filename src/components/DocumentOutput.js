import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Snackbar } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

import { copyToClipboard } from "../shared/utils/copyToClipboard";

import SubpageBoxOutput from "./SubpageBoxOutput";
import Card from "./Card/Card";

import "../style/DocumentOutput.scss";

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

  let orderTitle = "",
    comment = "";
  if (clientInfo.domain) {
    orderTitle = `${clientInfo.domain.replace(
      /(^[\s\t]*http(s){0,1}:\/\/(www\.){0,1})|(\/[\s\t]*$)/gi,
      ""
    )} - treści na stronę`;
  } else {
    orderTitle = "";
  }
  if (clientInfo.comment) {
    comment = (
      <span>
        <strong>Ogólne informacje do zamówienia:</strong> {clientInfo.comment}
      </span>
    );
  } else {
    comment = "";
  }

  let charactersToWrite = 0;
  if (subpages.length >= 1) {
    charactersToWrite = subpages
      .map(x => {
        return (
          (x.charactersToWrite === "" ? 0 : parseInt(x.charactersToWrite)) +
          (x.metaDesc ? parseInt(metaDescLength[1]) : 0)
        );
      })
      .reduce((x, y) => parseInt(x) + parseInt(y));
  }
  charactersToWrite = Math.ceil(charactersToWrite / 100) * 100;

  return (
    <div className="DocumentOutput col-md-6 col-lg-7">
      <Card classList={["container--generalInfo"]}>
        <h1>Podstawowe informacje:</h1>
        <p>
          <strong>Nazwa zadania: </strong>
          <span
            title="Skopuj nazwę zadania do schowka"
            className="toCopyOnClick"
            onClick={event => {
              copyOpenSnackbar(
                event,
                null,
                "Skopiowano nazwę zadania do schowka!"
              );
            }}
          >
            {orderTitle}
          </span>
        </p>
        <p>
          <strong>Liczba znaków: </strong>
          <span
            title="Skopuj liczbę znaków do schowka"
            className="toCopyOnClick"
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
        <p>
          <strong>Liczba tekstów: </strong>
          <span
            title="Skopuj liczbę tekstów do schowka"
            className="toCopyOnClick"
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
          title="Skopiuj treść zamówienia do schowka"
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
          <FontAwesomeIcon icon={faClipboard} />
        </Button>
        <span>
          <strong>Branża klienta:</strong> {clientInfo.industry}
        </span>
        {comment}
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
