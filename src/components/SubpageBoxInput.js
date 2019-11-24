import React, { Component } from "react";
import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";
import "../style/SubpageBoxInput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleUp,
    faAngleDown,
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import {
    Card,
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
        collapseActive: false,
        collapseButton: {
            message: "Zwiń",
            icon: <FontAwesomeIcon icon={faAngleUp} />,
            color: "secondary"
        },
        classes: {
            cardContent: "",
            cardTitle: "card--title-hidden"
        }
    };

    handleCollapseBoxButtonClick = () => {
        if (this.state.collapseActive === true) {
            this.setState({
                collapseActive: false,
                collapseButton: {
                    message: "Zwiń",
                    icon: <FontAwesomeIcon icon={faAngleUp} />,
                    color: "secondary"
                },
                classes: {
                    cardContent: "",
                    cardTitle: "card--title-hidden"
                }
            });
        } else if (this.state.collapseActive === false) {
            this.setState({
                collapseActive: true,
                collapseButton: {
                    message: [this.props.subpage.url],
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
        const { collapseButton, classes } = this.state;
        const {
            subpage,
            index,
            handleRemoveSubpageButtonClick,
            handleSubpageBoxChange,
            orderTypes
        } = this.props;

        let modulesToRender = undefined;
        for (let i in orderTypes) {
            if (orderTypes[i].value === subpage.type) {
                modulesToRender = orderTypes[i].components;
            }
        }

        let toRender = [];
        if (modulesToRender === undefined) {
            toRender.push(<p>Niepoprawny typ zamówienia!</p>);
        } else {
            if (modulesToRender.includes("url")) {
                toRender.push(
                    <TextField
                        label="URL"
                        color="primary"
                        name="url"
                        key="url"
                        fullWidth
                        margin="dense"
                        value={subpage.url}
                        onChange={value =>
                            handleSubpageBoxChange(value, subpage.id)
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
                        value={subpage.charactersToExtendTo}
                        onChange={value =>
                            handleSubpageBoxChange(value, subpage.id)
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
                        value={subpage.charactersToWrite}
                        onChange={value =>
                            handleSubpageBoxChange(value, subpage.id)
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
                        value={subpage.h1}
                        onChange={value =>
                            handleSubpageBoxChange(value, subpage.id)
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
                                    checked={subpage.metaDesc}
                                    name="metaDesc"
                                    onChange={value =>
                                        handleSubpageBoxChange(
                                            value,
                                            subpage.id,
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
                        value={subpage.hx}
                        onChange={value =>
                            handleSubpageBoxChange(value, subpage.id)
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
                        value={subpage.phrases}
                        onChange={value =>
                            handleSubpageBoxChange(value, subpage.id)
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
                        value={subpage.inspiration}
                        onChange={value =>
                            handleSubpageBoxChange(value, subpage.id)
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
                        value={subpage.comment}
                        onChange={value =>
                            handleSubpageBoxChange(value, subpage.id)
                        }
                    />
                );
            }
        }

        return (
            <Card className="Card">
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
                            {orderTypes.map(option => (
                                <MenuItem key={uuidv1()} value={option.value}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {toRender}
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
                        onClick={this.handleCollapseBoxButtonClick}
                        className="cardBottom--button-collapse"
                        variant="contained"
                        margin="dense"
                        size="small"
                        color={collapseButton.color}
                    >
                        <div className="button--contentContainer">
                            <span className="button--contentContainer-left">
                                {collapseButton.icon}
                            </span>
                            <span className="button--contentContainer-center">
                                {collapseButton.message}
                            </span>
                            <span className="button--contentContainer-right">
                                {collapseButton.icon}
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
    orderTypes: PropTypes.array,
    handleSubpageBoxChange: PropTypes.func
};

export default SubpageBoxInput;
