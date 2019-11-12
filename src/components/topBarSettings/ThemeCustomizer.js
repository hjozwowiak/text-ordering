import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography, FormControlLabel, Switch } from "@material-ui/core";

const ThemeCustomizer = ({ colorTheme, onChange }) => {
    return (
        <Paper className="Paper">
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
