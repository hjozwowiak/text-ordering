import React from "react";
import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";

const InputSelectTest = ({ value, onChange, name, options }) => {
    const handleChange = event => {
        if (onChange) onChange({ [name]: event.target.value });
    };

    return (
        <select name={name} value={value} onChange={handleChange}>
            {options.map(option => (
                <option key={uuidv1()} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

InputSelectTest.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    options: PropTypes.array
};

export default InputSelectTest;
