import React from "react";
import PropTypes from "prop-types";
import "../style/MetaDescLengthModifier.scss";
import { Typography, Slider } from "@material-ui/core";

const MetaDescLengthModifier = ({ value, onChange }) => {
    return (
        <div>
            <Typography id="range-slider" gutterBottom>
                Długość meta description:
            </Typography>
            <div className="container--input">
                <div>{value[0]}</div>
                <div className="input--slider">
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
        </div>
    );
};

MetaDescLengthModifier.propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func
};

export default MetaDescLengthModifier;
