import React from "react";

const SubpageBoxOutputTypeContentNew = ({ subpage, index, orderTypes }) => {
    return (
        <div className="row">
            <div className="column">
                <br />
                <p>---</p>
                <br />
                <div className="row">
                    {index + 1}. {subpage.url}
                </div>
                <div className="row">
                    <span>Polecenie: </span>
                    <span>
                        {orderTypes.map(element => {
                            if (element.value === subpage.type)
                                return element.name;
                            return "";
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SubpageBoxOutputTypeContentNew;
