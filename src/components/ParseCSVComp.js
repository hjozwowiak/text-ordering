import React, { Component } from "react";
import PropTypes from "prop-types";

import { CSVReader } from "react-papaparse";

const buttonRef = React.createRef();

export default class ParseCSVComp extends Component {
  handleOnFileLoad = data => {
    let urlPhrasesObject = {};
    let subpagesArray = [];

    for (let i = 0; i < data.length; i++) {
      const url = data[i].data[1];
      if (url.match(/^http(s){0,1}:\/\//)) {
        const phrase = data[i].data[0];
        if (!(url in urlPhrasesObject)) {
          urlPhrasesObject[url] = [phrase];
        } else if (url in urlPhrasesObject) {
          urlPhrasesObject[url].push(phrase);
        }
      }
    }

    for (const key in urlPhrasesObject) {
      subpagesArray.push({
        ...this.props.createSubpageObject(),
        url: key,
        phrases: urlPhrasesObject[key].join("\n"),
        folded: true
      });
    }

    this.props.updateSubpages(subpagesArray);

    console.log(subpagesArray);
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOpenDialog = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  render() {
    return (
      <CSVReader
        ref={buttonRef}
        onFileLoad={this.handleOnFileLoad}
        onError={this.handleOnError}
        noClick
        noDrag
      >
        {({ file }) => (
          <aside
            style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}
          >
            <button type="button" onClick={this.handleOpenDialog}>
              Browse file
            </button>
          </aside>
        )}
      </CSVReader>
    );
  }
}

ParseCSVComp.propTypes = {
  createSubpageObject: PropTypes.func,
  updateSubpages: PropTypes.func
};
