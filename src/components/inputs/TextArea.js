import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ value, placeholder, onChange, name }) => {
    const handleChange = event => {
        if (onChange) onChange({ [name]: event.target.value });
    };

    return (
        <textarea
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            name={name}
        />
    );
};

TextArea.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    callback: PropTypes.func,
    name: PropTypes.string
};

export default TextArea;
