import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ value, placeholder, callback }) => {
    const handleChange = event => {
        if (callback) callback(event.target.value);
    };

    return (
        <input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};

TextArea.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    callback: PropTypes.func
};

export default TextArea;
