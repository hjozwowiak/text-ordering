import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";
import "../style/SubpageBoxInput.scss";
import * as constantsOrderTypes from "../shared/constants/constants.orderTypes";
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

const SubpageBoxInput = ({
    subpage,
    index,
    handleRemoveSubpageButtonClick,
    handleSubpageBoxChange
}) => {
    const [buttonFold, setButtonFold] = useState({});

    useEffect(() => {
        if (!subpage.folded) {
            setButtonFold({
                message: "Zwiń",
                icon: <FontAwesomeIcon icon={faAngleUp} />,
                color: "secondary",
                cardContentClass: ""
            });
        } else if (subpage.folded) {
            setButtonFold({
                message: subpage.url === "" ? "[brak nazwy]" : subpage.url,
                icon: <FontAwesomeIcon icon={faAngleDown} />,
                color: "primary",
                cardContentClass: "card--content-hidden"
            });
        }
    }, [subpage.folded]);

    const onFoldButtonClick = () => {
        handleSubpageBoxChange(
            document.querySelector(".cardBottom--button-fold"),
            subpage.id,
            !subpage.folded,
            document.querySelector(".cardBottom--button-fold").name
        );
    };

    const generateOutputCode = orderType => {
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
                        label="Nowe nagłówki lub zawartość poszczególnych akapitów"
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
            if (modulesToRender.includes("commonWords")) {
                toRender.push(
                    <TextField
                        label="Common words"
                        color="primary"
                        name="commonWords"
                        key="commonWords"
                        fullWidth
                        multiline
                        rowsMax="7"
                        margin="dense"
                        variant="outlined"
                        value={subpage.commonWords}
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
                        label="Uwagi"
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

            return toRender;
        }
    };

    return (
        <Card className="Card">
            <div className={`cardContent ${buttonFold.cardContentClass}`}>
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
                                        constantsOrderTypes.orderTypes[option]
                                            .name
                                    }
                                </MenuItem>
                            )
                        )}
                    </Select>
                </FormControl>
                {generateOutputCode(subpage.type)}
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
                    onClick={onFoldButtonClick}
                    className="cardBottom--button-fold"
                    variant="contained"
                    margin="dense"
                    size="small"
                    name="folded"
                    color={buttonFold.color}
                >
                    <div className="button--contentContainer">
                        <span className="button--contentContainer-left">
                            {buttonFold.icon}
                        </span>
                        <span className="button--contentContainer-center">
                            {buttonFold.message}
                        </span>
                        <span className="button--contentContainer-right">
                            {buttonFold.icon}
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
                    onClick={() => handleRemoveSubpageButtonClick(subpage.id)}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </Button>
            </div>
        </Card>
    );
};

SubpageBoxInput.propTypes = {
    subpage: PropTypes.object,
    index: PropTypes.number,
    handleSubpageBoxChange: PropTypes.func
};

export default SubpageBoxInput;
