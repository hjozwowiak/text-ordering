import React from "react";
import PropTypes from "prop-types";

const InputText = ({ value, placeholder, onChange, name }) => {
    const handleChange = event => {
        if (onChange) onChange({ [name]: event.target.value });
    };

    return (
        <input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            name={name}
        />
    );
};

InputText.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string
};

export default InputText;
