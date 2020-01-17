import React, { Component } from "react";
import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";
import Card from "./Card/Card";
import "../style/SubpageBoxInput.scss";
import * as constantsOrderTypes from "../shared/constants/constants.orderTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleUp,
    faAngleDown,
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import {
    TextField,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Button
} from "@material-ui/core";

class SubpageBoxInput extends Component {
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

    generateOutputCode = orderType => {
        if (orderType in constantsOrderTypes.orderTypes) {
            const modulesToRender =
                constantsOrderTypes.orderTypes[orderType].fields;
            let toRender = [];

            if (modulesToRender.includes("url")) {
                toRender.push(
                    <TextField
                        label="URL"
                        color="primary"
                        name="url"
                        key="url"
                        fullWidth
                        margin="dense"
                        value={this.props.subpage.url}
                        onChange={value =>
                            this.props.handleSubpageBoxChange(
                                value,
                                this.props.subpage.id
                            )
                        }
                    />
                );
            }
            if (modulesToRender.includes("charactersToExtendTo")) {
                toRender.push(
                    <TextField
                        label="Liczba znaków, do których rozszerzyć tekst"
                        color="primary"
                        name="charactersToExtendTo"
                        key="charactersToExtendTo"
                        fullWidth
                        margin="dense"
                        type="number"
                        value={this.props.subpage.charactersToExtendTo}
                        onChange={value =>
                            this.props.handleSubpageBoxChange(
                                value,
                                this.props.subpage.id
                            )
                        }
                    />
                );
            }
            if (modulesToRender.includes("charactersToWrite")) {
                toRender.push(
                    <TextField
                        label="Liczba nowych znaków do napisania"
                        color="primary"
                        name="charactersToWrite"
                        key="charactersToWrite"
                        fullWidth
                        margin="dense"
                        type="number"
                        value={this.props.subpage.charactersToWrite}
                        onChange={value =>
                            this.props.handleSubpageBoxChange(
                                value,
                                this.props.subpage.id
                            )
                        }
                    />
                );
            }
            if (modulesToRender.includes("h1")) {
                toRender.push(
                    <TextField
                        label="Nagłówek H1"
                        color="primary"
                        name="h1"
                        key="h1"
                        fullWidth
                        margin="dense"
                        value={this.props.subpage.h1}
                        onChange={value =>
                            this.props.handleSubpageBoxChange(
                                value,
                                this.props.subpage.id
                            )
                        }
                    />
                );
            }
            if (modulesToRender.includes("metaDesc")) {
                toRender.push(
                    <p key="metaDesc">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.props.subpage.metaDesc}
                                    name="metaDesc"
                                    onChange={value =>
                                        this.props.handleSubpageBoxChange(
                                            value,
                                            this.props.subpage.id,
                                            "checked"
                                        )
                                    }
                                    color="primary"
                                />
                            }
                            label="Meta description"
                        />
                    </p>
                );
            }
            if (modulesToRender.includes("hx")) {
                toRender.push(
                    <TextField
                        label="Wykaz nagłówków HX"
                        color="primary"
                        name="hx"
                        key="hx"
                        fullWidth
                        multiline
                        rowsMax="3"
                        margin="dense"
                        variant="outlined"
                        value={this.props.subpage.hx}
                        onChange={value =>
                            this.props.handleSubpageBoxChange(
                                value,
                                this.props.subpage.id
                            )
                        }
                    />
                );
            }
            if (modulesToRender.includes("phrases")) {
                toRender.push(
                    <TextField
                        label="Lista fraz"
                        color="primary"
                        name="phrases"
                        key="phrases"
                        fullWidth
                        multiline
                        rowsMax="7"
                        margin="dense"
                        variant="outlined"
                        value={this.props.subpage.phrases}
                        onChange={value =>
                            this.props.handleSubpageBoxChange(
                                value,
                                this.props.subpage.id
                            )
                        }
                    />
                );
            }
            if (modulesToRender.includes("inspiration")) {
                toRender.push(
                    <TextField
                        label="Inspiracje"
                        color="primary"
                        name="inspiration"
                        key="inspiration"
                        fullWidth
                        multiline
                        rowsMax="10"
                        margin="dense"
                        variant="outlined"
                        value={this.props.subpage.inspiration}
                        onChange={value =>
                            this.props.handleSubpageBoxChange(
                                value,
                                this.props.subpage.id
                            )
                        }
                    />
                );
            }
            if (modulesToRender.includes("comment")) {
                toRender.push(
                    <TextField
                        label="Komentarz"
                        color="primary"
                        name="comment"
                        key="comment"
                        fullWidth
                        multiline
                        rowsMax="10"
                        margin="dense"
                        variant="outlined"
                        value={this.props.subpage.comment}
                        onChange={value =>
                            this.props.handleSubpageBoxChange(
                                value,
                                this.props.subpage.id
                            )
                        }
                    />
                );
            }

            return toRender;
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
                    {this.generateOutputCode(subpage.type)}
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

SubpageBoxInput.propTypes = {
    subpage: PropTypes.object,
    index: PropTypes.number,
    handleSubpageBoxChange: PropTypes.func
};

export default SubpageBoxInput;
