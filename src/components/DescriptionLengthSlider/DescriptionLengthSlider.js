import React from "react";
import PropTypes from "prop-types";
import { Typography, Slider } from "@material-ui/core";

import Paper from "../Paper/Paper";

import "./DescriptionLengthSlider.scss";

const DescriptionLengthSlider = ({ value, onChange }) => {
    return (
        <Paper>
            <Typography gutterBottom>Długość meta description:</Typography>
            <div className="DescriptionLengthSlider--input">
                <div>{value[0]}</div>
                <div className="DescriptionLengthSlider--slider">
                    <Slider
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        value={value}
                        onChange={onChange}
                        step={5}
                        min={0}
                        max={250}
                    />
                </div>
                <div>{value[1]}</div>
            </div>
        </Paper>
    );
};

DescriptionLengthSlider.propTypes = {
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default DescriptionLengthSlider;
