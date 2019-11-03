import React from "react";

const SubpageBoxOutputTypeContentNewExtendCurrent = ({
    subpage,
    index,
    orderTypes
}) => {
    return (
        <div className="row">
            <div className="col-md-12">
                <br />
                <p>---</p>
                <br />
                <p>
                    {index + 1}. {subpage.url}
                </p>
                <p>
                    Polecenie:
                    <span>
                        {orderTypes.map(element => {
                            if (element.value === subpage.type)
                                return element.name;
                            return "";
                        })}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SubpageBoxOutputTypeContentNewExtendCurrent;
