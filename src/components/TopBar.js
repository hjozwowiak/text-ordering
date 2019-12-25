import React, { Component } from "react";
import PropTypes from "prop-types";
import "../style/TopBar.scss";
import MetaDescLengthModifier from "./topBarSettings/MetaDescLengthModifier";
import ThemeCustomizer from "./topBarSettings/ThemeCustomizer";
import { Button, ButtonGroup } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

class TopBar extends Component {
    state = {
        settingsHidden: true,
        topBarImgsNum: 10,
        topBarImgName: "loading.gif"
    };

    componentDidMount() {}

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
            topBarImgName
        } = this.props;

        let visibilityClass = "hidden";
        if (settingsHidden === false) {
            visibilityClass = "visible";
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
                        <Button onClick={handleClearButtonClick}>
                            Wyczyść pola
                        </Button>
                        <Button onClick={this.toggleHidden}>
                            <FontAwesomeIcon icon={faCog} />
                        </Button>
                    </ButtonGroup>
                </div>
                <div className={`TopBar--settings ${visibilityClass}`}>
                    <MetaDescLengthModifier
                        value={settings.metaDescLength}
                        onChange={updateMetaDescLength}
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
