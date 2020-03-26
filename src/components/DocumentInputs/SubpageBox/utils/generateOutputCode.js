import React from "react";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";

export const generateOutputCode = (
    orderTypesList,
    subpage,
    handleChangeFunction
) => {
    if (subpage.type in orderTypesList) {
        const modulesToRender = orderTypesList[subpage.type].fields;
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
                    onChange={value => handleChangeFunction(value, subpage.id)}
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
                    onChange={value => handleChangeFunction(value, subpage.id)}
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
                    onChange={value => handleChangeFunction(value, subpage.id)}
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
                    onChange={value => handleChangeFunction(value, subpage.id)}
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
                                    handleChangeFunction(
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
                    onChange={value => handleChangeFunction(value, subpage.id)}
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
                    onChange={value => handleChangeFunction(value, subpage.id)}
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
                    onChange={value => handleChangeFunction(value, subpage.id)}
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
                    onChange={value => handleChangeFunction(value, subpage.id)}
                />
            );
        }
        return toRender;
    }
};
