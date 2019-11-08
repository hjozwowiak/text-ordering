import React from "react";
import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";
import {
    Card,
    TextField,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";

const SubpageBoxInput = ({
    subpage,
    index,
    handleSubpageBoxChange,
    orderTypes
}) => {
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
            <span className="cardLabel">{index + 1}</span>
            <FormControl fullWidth variant="outlined">
                <InputLabel>Polecenie</InputLabel>
                <Select
                    value={subpage.type}
                    name="type"
                    margin="dense"
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
        </Card>
    );
};

SubpageBoxInput.propTypes = {
    subpage: PropTypes.object,
    index: PropTypes.number,
    orderTypes: PropTypes.array,
    handleSubpageBoxChange: PropTypes.func
};

export default SubpageBoxInput;
