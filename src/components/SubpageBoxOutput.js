import React from "react";

const SubpageBoxOutput = ({ subpage }) => {
    return (
        <div className="row">
            <div className="column">
                <br />
                <p>---</p>
                <br />
                <div className="row">
                    {subpage.index + 1}. {subpage.url}
                </div>
            </div>
        </div>
    );
};

export default SubpageBoxOutput;
