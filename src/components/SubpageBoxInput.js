import React, { Component } from "react";
import PropTypes from "prop-types";
import InputText from "./inputs/InputText";

class SubpageBoxInput extends Component {
    state = { url: "", h1: "" };

    render() {
        const { url, h1 } = this.state;
        const { subpage } = this.props;

        return (
            <div className="row">
                <div className="column">
                    <hr />
                    <div className="row">{subpage.index + 1}</div>
                    <div className="row">
                        <InputText
                            value={url}
                            placeholder="URL"
                            callback={url => this.setState({ url })}
                        />
                    </div>
                    <div className="row">
                        <InputText
                            value={h1}
                            placeholder="Nagłówek H1"
                            callback={h1 => this.setState({ h1 })}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

SubpageBoxInput.propTypes = {
    subpage: PropTypes.object,
    index: PropTypes.number
};

export default SubpageBoxInput;
