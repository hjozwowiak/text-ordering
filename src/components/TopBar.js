import React, { Component } from "react";
import PropTypes from "prop-types";
import "../style/TopBar.scss";
import MetaDescLengthModifier from "./MetaDescLengthModifier";
import { Button, ButtonGroup, Paper } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

class TopBar extends Component {
    state = { settingsHidden: true };

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
            metaDescLength,
            updateMetaDescLength
        } = this.props;

        let visibilityClass = "hidden";
        if (settingsHidden === false) {
            visibilityClass = "visible";
        }

        return (
            <div className="TopBar row">
                <div className="TopBar--options ">
                    <h1>Template generator</h1>
                    <ButtonGroup
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
                    <Paper className="Paper">
                        <MetaDescLengthModifier
                            value={metaDescLength}
                            onChange={updateMetaDescLength}
                        />
                    </Paper>
                </div>
            </div>
        );
    }
}

TopBar.propTypes = {
    handleClearButtonClick: PropTypes.func,
    metaDescLength: PropTypes.array,
    updateMetaDescLength: PropTypes.func
};

export default TopBar;
