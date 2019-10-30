import React from "react";
import SubpageBoxOutputTypeContentNew from "./subpageBoxElements/outputComponents/SubpageBoxOutputTypeContentNew";
import SubpageBoxOutputTypeContentNewExtendCurrent from "./subpageBoxElements/outputComponents/SubpageBoxOutputTypeContentNewExtendCurrent";

const SubpageBoxOutput = ({ subpage, index, orderTypes }) => {
    if (subpage.type === "contentNew") {
        return (
            <SubpageBoxOutputTypeContentNew
                subpage={subpage}
                index={index}
                orderTypes={orderTypes}
            />
        );
    }
    if (subpage.type === "contentNewExtendCurrent") {
        return (
            <SubpageBoxOutputTypeContentNewExtendCurrent
                subpage={subpage}
                index={index}
                orderTypes={orderTypes}
            />
        );
    }
    return (
        <div className="row">
            <div className="col-md-12">
                <br />
                <p>---</p>
                <br />
                <p>
                    {index + 1}. {subpage.url}
                </p>
                <div className="row">Niepoprawny typ zamówienia!</div>
            </div>
        </div>
    );
};

export default SubpageBoxOutput;
