import React, { Component } from "react";
import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleUp,
    faAngleDown,
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import {
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Button
} from "@material-ui/core";

import * as constantsOrderTypes from "../../../shared/constants/constants.orderTypes";
import { orderTypes } from "../../../shared/constants/constants.orderTypes";
import { generateOutputCode } from "./utils/generateOutputCode";

import Card from "../../Card/Card";

import "./SubpageBox.scss";

class SubpageBox extends Component {
    state = {
        foldActive: false,
        foldButton: {
            message: "Zwiń",
            icon: <FontAwesomeIcon icon={faAngleUp} />,
            color: "secondary"
        },
        classes: {
            cardContent: "",
            cardTitle: "card--title-hidden"
        }
    };

    componentDidMount() {
        if (this.props.subpage.folded === false) {
            this.setState({
                foldButton: {
                    message: "Zwiń",
                    icon: <FontAwesomeIcon icon={faAngleUp} />,
                    color: "secondary"
                },
                classes: {
                    cardContent: "",
                    cardTitle: "card--title-hidden"
                }
            });
        } else if (this.props.subpage.folded === true) {
            let message = this.props.subpage.url;
            if (message === "") message = "[brak nazwy]";
            this.setState({
                foldButton: {
                    message: message,
                    icon: <FontAwesomeIcon icon={faAngleDown} />,
                    color: "primary"
                },
                classes: {
                    cardContent: "card--content-hidden",
                    cardTitle: ""
                }
            });
        }
    }

    shouldComponentUpdate(nextProps) {
        return !(this.props.subpage === nextProps.subpage);
    }

    handleFoldBoxButtonClick = () => {
        this.props.handleSubpageBoxChange(
            document.querySelector(".cardBottom--button-fold"),
            this.props.subpage.id,
            !this.props.subpage.folded,
            document.querySelector(".cardBottom--button-fold").name
        );

        if (this.props.subpage.folded === true) {
            this.setState({
                foldButton: {
                    message: "Zwiń",
                    icon: <FontAwesomeIcon icon={faAngleUp} />,
                    color: "secondary"
                },
                classes: {
                    cardContent: "",
                    cardTitle: "card--title-hidden"
                }
            });
        } else if (this.props.subpage.folded === false) {
            let message = this.props.subpage.url;
            if (message === "") message = "[brak nazwy]";
            this.setState({
                foldButton: {
                    message: message,
                    icon: <FontAwesomeIcon icon={faAngleDown} />,
                    color: "primary"
                },
                classes: {
                    cardContent: "card--content-hidden",
                    cardTitle: ""
                }
            });
        }
    };

    render() {
        const { foldButton, classes } = this.state;
        const {
            subpage,
            index,
            handleRemoveSubpageButtonClick,
            handleSubpageBoxChange
        } = this.props;

        return (
            <Card>
                <div className={`cardContent ${classes.cardContent}`}>
                    <FormControl fullWidth variant="outlined" margin="dense">
                        <InputLabel>Polecenie</InputLabel>
                        <Select
                            value={subpage.type}
                            name="type"
                            onChange={event =>
                                handleSubpageBoxChange(event, subpage.id)
                            }
                        >
                            {Object.keys(constantsOrderTypes.orderTypes).map(
                                option => (
                                    <MenuItem key={uuidv1()} value={option}>
                                        {
                                            constantsOrderTypes.orderTypes[
                                                option
                                            ].name
                                        }
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                    {generateOutputCode(
                        orderTypes,
                        subpage,
                        handleSubpageBoxChange
                    )}
                </div>
                <div className="cardBottom">
                    <Button
                        className="cardBottom--button-identifier"
                        variant="contained"
                        margin="dense"
                        size="small"
                        color="default"
                    >
                        {index + 1}
                    </Button>
                    <Button
                        onClick={this.handleFoldBoxButtonClick}
                        className="cardBottom--button-fold"
                        variant="contained"
                        margin="dense"
                        size="small"
                        name="folded"
                        color={foldButton.color}
                    >
                        <div className="button--contentContainer">
                            <span className="button--contentContainer-left">
                                {foldButton.icon}
                            </span>
                            <span className="button--contentContainer-center">
                                {foldButton.message}
                            </span>
                            <span className="button--contentContainer-right">
                                {foldButton.icon}
                            </span>
                        </div>
                    </Button>

                    <Button
                        className="cardBottom--button-delete"
                        variant="contained"
                        margin="dense"
                        size="small"
                        color="primary"
                        onChange={value =>
                            handleSubpageBoxChange(value, subpage.id)
                        }
                        onClick={() =>
                            handleRemoveSubpageButtonClick(subpage.id)
                        }
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </Button>
                </div>
            </Card>
        );
    }
}

SubpageBox.propTypes = {
    subpage: PropTypes.object,
    index: PropTypes.number,
    handleSubpageBoxChange: PropTypes.func
};

export default SubpageBox;
