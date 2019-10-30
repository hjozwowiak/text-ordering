import React from "react";
import InputSelect from "../../inputs/InputSelect";

const InputSelectType = (subpage, handleSubpageBoxChange, orderTypes) => {
    return (
        <p>
            <InputSelect
                value={subpage.type}
                onChange={value => handleSubpageBoxChange(value, subpage.id)}
                name="type"
                // options={orderTypes}
                options={["test1", "test2"]}
            />
        </p>
    );
};

export default InputSelectType;
