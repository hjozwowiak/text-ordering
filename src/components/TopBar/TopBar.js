import React, { Component, memo } from "react";
import PropTypes from "prop-types";
import localStorage from "local-storage";
import { Button, ButtonGroup } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faBroom,
  faMinusSquare,
  faPlusSquare,
  faFileImport,
} from "@fortawesome/free-solid-svg-icons";
import { CSVReader } from "react-papaparse";

import DescriptionLengthSlider from "../DescriptionLengthSlider/DescriptionLengthSlider";
import ThemeCustomizer from "../topBarSettings/ThemeCustomizer";

import "./TopBar.scss";

const buttonRef = React.createRef();

class TopBar extends Component {
  state = {
    isDropdownVisible: false,
  };

  toggleHidden = () => {
    this.setState({
      isDropdownVisible: !this.state.isDropdownVisible,
    });
  };

  handleOnFileLoad = (data) => {
    let urlPhrasesObject = {};
    let subpagesArray = [];
    let urlCounter = 0;
    let phraseCounter = 0;

    console.log("--- START Scheme import raport ---");
    for (let i = 0; i < data.length; i++) {
      const url = data[i].data[1];
      const phrase = data[i].data[0];
      if (url.match(/^http(s){0,1}:\/\//)) {
        phraseCounter++;
        if (!(url in urlPhrasesObject)) {
          urlCounter++;
          urlPhrasesObject[url] = [phrase];
        } else if (url in urlPhrasesObject) {
          urlPhrasesObject[url].push(phrase);
        }
      } else {
        console.log(`Invalid URL "${url}" for phrase "${phrase}"`);
      }
    }
    console.log("--- SUMMARY Scheme import raport ---");
    console.log(
      `Correctly imported ${phraseCounter} phrases for ${urlCounter} URLs.`
    );
    console.log("--- END Scheme import raport ---");

    for (const key in urlPhrasesObject) {
      subpagesArray.push({
        ...this.props.createSubpageObject(),
        url: key,
        phrases: urlPhrasesObject[key].join("\n"),
        folded: true,
      });
    }

    subpagesArray.sort((a, b) => {
      if (a.url > b.url) {
        return 1;
      }
      if (b.url > a.url) {
        return -1;
      }
      return 0;
    });

    this.props.updateWholeSubpagesObject(subpagesArray);
    localStorage.set("subpages", JSON.stringify(subpagesArray));
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOpenDialog = (e) => {
    if (buttonRef.current) {
      this.props.runModal(
        "Import rozpiski",
        "Rozpiska powinna mieć format [fraza | poprawny adres URL] ... . Import rozpiski spowoduje nadpisanie obecnych danych zamówienia. Operacja jest nieodwracalna. Raport importu dostępny w konsoli przeglądarki.",
        () => {
          buttonRef.current.open(e);
        }
      );
    } else {
      console.log("Unknown error - on open input file dialog");
    }
  };

  render() {
    const { isDropdownVisible } = this.state;
    const {
      onClearButtonClick,
      settings,
      onThemeTypeSwitchChange,
      onMetaDescLengthChange,
      triggerPepe,
      topBarImgName,
      onToggleFoldAllButtonClick,
    } = this.props;

    return (
      <div className="TopBar row">
        <div className="TopBar__options ">
          <div className="TopBar__imgContainer">
            <img
              onClick={() => {
                triggerPepe();
              }}
              className="TopBar__img"
              alt="gfy"
              src={"/img/" + topBarImgName}
            />
          </div>
          <h1 className="TopBar__header">Zamawiarka treści</h1>
          <ButtonGroup
            className="TopBar__button-group"
            size="small"
            aria-label="small outlined button group"
            color="secondary"
          >
            <Button
              className="button TopBar__button"
              title="Rozwiń wszystkie"
              onClick={() => {
                onToggleFoldAllButtonClick("expand");
              }}
            >
              <FontAwesomeIcon icon={faPlusSquare} />
            </Button>
            <Button
              className="button TopBar__button"
              title="Zwiń wszystkie"
              onClick={() => {
                onToggleFoldAllButtonClick("fold");
              }}
            >
              <FontAwesomeIcon icon={faMinusSquare} />
            </Button>
            <Button
              className="button TopBar__button"
              title="Importuj rozpiskę"
              onClick={this.handleOpenDialog}
            >
              <FontAwesomeIcon icon={faFileImport} />
            </Button>
            <Button
              className="button TopBar__button"
              title="Wyczyść wszystkie dane zamówienia"
              onClick={onClearButtonClick}
            >
              <FontAwesomeIcon icon={faBroom} />
            </Button>
            <Button className="button" onClick={this.toggleHidden}>
              <FontAwesomeIcon icon={faCog} />
            </Button>
          </ButtonGroup>
        </div>
        <div
          className={`TopBar__dropdown ${
            isDropdownVisible && "TopBar__dropdown--visible"
          }`}
        >
          <DescriptionLengthSlider
            value={settings.metaDescLength}
            onChange={(_, arr) => {
              onMetaDescLengthChange(arr);
            }}
          />
          <ThemeCustomizer
            colorTheme={settings.colorTheme}
            onChange={onThemeTypeSwitchChange}
          />
        </div>
        <span style={{ visibility: "hidden" }}>
          <CSVReader
            ref={buttonRef}
            onFileLoad={this.handleOnFileLoad}
            onError={this.handleOnError}
            noClick
            noDrag
          >
            {({ file }) => <span></span>}
          </CSVReader>
        </span>
      </div>
    );
  }
}

TopBar.propTypes = {
  onClearButtonClick: PropTypes.func,
  settings: PropTypes.shape({
    colorTheme: PropTypes.shape({
      darkMode: PropTypes.bool,
      palette: PropTypes.object,
    }),
    metaDescLength: PropTypes.array,
  }).isRequired,
  onMetaDescLengthChange: PropTypes.func.isRequired,
  topBarImgName: PropTypes.string.isRequired,
  onThemeTypeSwitchChange: PropTypes.func.isRequired,
  onToggleFoldAllButtonClick: PropTypes.func.isRequired,
  runModal: PropTypes.func,
  createSubpageObject: PropTypes.func,
  updateSubpages: PropTypes.func,
};

export default memo(TopBar);
