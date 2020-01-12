import React from "react";
import PropTypes from "prop-types";
import { Typography, FormControlLabel, Switch } from "@material-ui/core";

import Paper from "../Paper/Paper";

const ThemeCustomizer = ({ colorTheme, onChange }) => {
    return (
        <Paper>
            <Typography gutterBottom>Ustawienia motywu:</Typography>
            <div>
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            onChange={onChange}
                            checked={colorTheme.darkMode}
                        />
                    }
                    label="Dark mode"
                />
            </div>
        </Paper>
    );
};

ThemeCustomizer.propTypes = {
    colorTheme: PropTypes.object,
    onChange: PropTypes.func
};

export default ThemeCustomizer;
