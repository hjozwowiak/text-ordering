import React, { Component } from "react";
import PropTypes from "prop-types";
import "../style/TopBar.scss";
import MetaDescLengthModifier from "./topBarSettings/MetaDescLengthModifier";
import ThemeCustomizer from "./topBarSettings/ThemeCustomizer";
import { Button, ButtonGroup } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCog,
    faBroom,
    faMinusSquare,
    faPlusSquare,
    faCopy
} from "@fortawesome/free-solid-svg-icons";

class TopBar extends Component {
    state = {
        settingsHidden: true,
        topBarImgsNum: 10,
        topBarImgName: "loading.gif"
    };

    toggleHidden = () => {
        this.setState({
            settingsHidden: !this.state.settingsHidden
        });
    };

    handleChange = (event, newValue) => {
        this.setState({ metaDescLength: newValue });
    };

    render() {
        const { settingsHidden } = this.state;
        const {
            handleClearButtonClick,
            settings,
            handleChangeThemeTypeSwitch,
            updateMetaDescLength,
            topBarImgName,
            handleToggleFoldAllButtonClick
        } = this.props;

        let visibilityClass = "TopBar--settings-hidden";
        if (settingsHidden === false) {
            visibilityClass = "";
        }

        return (
            <div className="TopBar row">
                <div className="TopBar--options ">
                    <div className="TopBar--imgContainer">
                        <img
                            className="imgContainer--img"
                            alt="gfy"
                            src={"/img/" + topBarImgName}
                        />
                    </div>
                    <h1 className="TopBar--header">Template generator</h1>
                    <ButtonGroup
                        className="TopBar--optionsButtons"
                        size="small"
                        aria-label="small outlined button group"
                        color="secondary"
                    >
                        <Button
                            title="Rozwiń wszystkie"
                            onClick={() => {
                                handleToggleFoldAllButtonClick("expand");
                            }}
                        >
                            <FontAwesomeIcon icon={faPlusSquare} />
                        </Button>
                        <Button
                            title="Zwiń wszystkie"
                            onClick={() => {
                                handleToggleFoldAllButtonClick("fold");
                            }}
                        >
                            <FontAwesomeIcon icon={faMinusSquare} />
                        </Button>
                        <Button
                            title="Wyczyść wszystkie dane zamówienia"
                            onClick={handleClearButtonClick}
                        >
                            <FontAwesomeIcon icon={faBroom} />
                        </Button>
                        <Button title="Ustawienia" onClick={this.toggleHidden}>
                            <FontAwesomeIcon icon={faCog} />
                        </Button>
                    </ButtonGroup>
                </div>
                <div className={`TopBar--settings ${visibilityClass}`}>
                    <MetaDescLengthModifier
                        value={settings.metaDescLength}
                        onChange={(_, arr) => {
                            updateMetaDescLength(arr);
                        }}
                    />
                    <ThemeCustomizer
                        colorTheme={settings.colorTheme}
                        onChange={handleChangeThemeTypeSwitch}
                    />
                </div>
            </div>
        );
    }
}

TopBar.propTypes = {
    handleClearButtonClick: PropTypes.func,
    settings: PropTypes.object,
    updateMetaDescLength: PropTypes.func,
    topBarImgName: PropTypes.string,
    handleChangeThemeTypeSwitch: PropTypes.func
};

export default TopBar;
