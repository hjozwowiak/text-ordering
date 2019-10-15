//import "./style/App.scss";
import React, { Component } from "react";
import DocumentInputs from "./components/DocumentInputs";
import DocumentOutput from "./components/DocumentOutput";

class App extends Component {
    state = {
        clientInfo: { domain: "", industry: "", comment: "" },
        count: 0,
        subpages: []
    };

    handleAddButtonClick = () => {
        this.setState(state => ({
            ...state,
            count: state.count + 1,
            subpages: [
                ...state.subpages,
                {
                    index: state.count,
                    url: "",
                    h1: ""
                }
            ]
        }));
    };

    handleSubpageBoxChange = event => {
        console.log(event);
    };

    handleSubpageBoxTypeChange = event => {
        console.log(event.options[event.selectedIndex].value);
    };

    render() {
        const { clientInfo, count, subpages } = this.state;

        return (
            <div className="App container">
                <div className="row">
                    <DocumentInputs
                        clientInfo={clientInfo}
                        updateClientInfo={value =>
                            this.setState({
                                clientInfo: {
                                    ...this.state.clientInfo,
                                    ...value
                                }
                            })
                        }
                        count={count}
                        subpages={subpages}
                        handleAddButtonClick={this.handleAddButtonClick}
                    />
                    <DocumentOutput
                        clientInfo={clientInfo}
                        subpages={subpages}
                    />
                </div>
            </div>
        );
    }
}

export default App;
