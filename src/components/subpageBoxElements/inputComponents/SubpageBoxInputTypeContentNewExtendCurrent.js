import React, { Component } from "react";
import PropTypes from "prop-types";
import InputText from "../../inputs/InputText";
import InputSelect from "../../inputs/InputSelect";
import TextArea from "../../inputs/TextArea";

class SubpageBoxInputTypeContentNewExtendCurrent extends Component {
    render() {
        const {
            subpage,
            index,
            handleSubpageBoxChange,
            orderTypes
        } = this.props;

        return (
            <div>
                <hr />
                <p>{index + 1}</p>
                <p>
                    <InputText
                        value={subpage.url}
                        placeholder="URL"
                        onChange={value =>
                            handleSubpageBoxChange(value, subpage.id)
                        }
                        name="url"
                    />
                </p>
                <p>
                    <InputSelect
                        value={subpage.type}
                        onChange={value =>
                            handleSubpageBoxChange(value, subpage.id)
                        }
                        name="type"
                        options={orderTypes}
                    />
                </p>
                <p>
                    <InputText
                        value={subpage.charactersToExtendTo}
                        placeholder="Liczba znaków, do których należy rozszerzyć tekst"
                        onChange={value =>
                            handleSubpageBoxChange(value, subpage.id)
                        }
                        name="charactersToExtendTo"
                    />
                </p>
                <p>
                    <InputText
                        value={subpage.charactersToWrite}
                        placeholder="Liczba nowych znaków do napisania"
                        onChange={value =>
                            handleSubpageBoxChange(value, subpage.id)
                        }
                        name="charactersToWrite"
                    />
                </p>
                <p>
                    <p>Meta description: Tu będzie checkbox</p>
                </p>
                <p>
                    <InputText
                        value={subpage.h1}
                        placeholder="Nagłówek H1"
                        onChange={value =>
                            handleSubpageBoxChange(value, subpage.id)
                        }
                        name="h1"
                    />
                </p>
                <p>
                    <TextArea
                        value={subpage.phrases}
                        placeholder="Lista fraz"
                        onChange={value =>
                            handleSubpageBoxChange(value, subpage.id)
                        }
                        name="phrases"
                    />
                </p>
            </div>
        );
    }
}

SubpageBoxInputTypeContentNewExtendCurrent.propTypes = {
    subpage: PropTypes.object,
    index: PropTypes.number,
    orderTypes: PropTypes.array
};

export default SubpageBoxInputTypeContentNewExtendCurrent;
