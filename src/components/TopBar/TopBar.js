import React, { Component, memo } from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faBroom,
  faMinusSquare,
  faPlusSquare
} from "@fortawesome/free-solid-svg-icons";

import DescriptionLengthSlider from "../DescriptionLengthSlider/DescriptionLengthSlider";
import ThemeCustomizer from "../topBarSettings/ThemeCustomizer";

import "./TopBar.scss";

class TopBar extends Component {
  state = {
    isDropdownVisible: false
  };

  toggleHidden = () => {
    this.setState({
      isDropdownVisible: !this.state.isDropdownVisible
    });
  };

  render() {
    const { isDropdownVisible } = this.state;
    const {
      onClearButtonClick,
      settings,
      onThemeTypeSwitchChange,
      onMetaDescLengthChange,
      topBarImgName,
      onToggleFoldAllButtonClick
    } = this.props;

    return (
      <div className="TopBar row">
        <div className="TopBar__options ">
          <div className="TopBar__imgContainer">
            <img
              className="TopBar__img"
              alt="gfy"
              src={"/img/" + topBarImgName}
            />
          </div>
          <h1 className="TopBar__header">Template generator</h1>
          <ButtonGroup
            className="TopBar__button-group"
            size="small"
            aria-label="small outlined button group"
            color="secondary"
          >
            <Button
              className="TopBar__button"
              title="Rozwiń wszystkie"
              onClick={() => {
                onToggleFoldAllButtonClick("expand");
              }}
            >
              <FontAwesomeIcon icon={faPlusSquare} />
            </Button>
            <Button
              className="TopBar__button"
              title="Zwiń wszystkie"
              onClick={() => {
                onToggleFoldAllButtonClick("fold");
              }}
            >
              <FontAwesomeIcon icon={faMinusSquare} />
            </Button>
            <Button
              className="TopBar__button"
              title="Wyczyść wszystkie dane zamówienia"
              onClick={onClearButtonClick}
            >
              <FontAwesomeIcon icon={faBroom} />
            </Button>
            <Button onClick={this.toggleHidden}>
              <FontAwesomeIcon icon={faCog} />
            </Button>
          </ButtonGroup>
        </div>
        <div
          className={`TopBar__dropdown ${isDropdownVisible &&
            "TopBar__dropdown--visible"}`}
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
      </div>
    );
  }
}

TopBar.propTypes = {
  onClearButtonClick: PropTypes.func,
  settings: PropTypes.shape({
    colorTheme: PropTypes.shape({
      darkMode: PropTypes.bool,
      palette: PropTypes.object
    }),
    metaDescLength: PropTypes.array
  }).isRequired,
  onMetaDescLengthChange: PropTypes.func.isRequired,
  topBarImgName: PropTypes.string.isRequired,
  onThemeTypeSwitchChange: PropTypes.func.isRequired,
  onToggleFoldAllButtonClick: PropTypes.func.isRequired
};

export default memo(TopBar);