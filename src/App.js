import React, { Component } from "react";
import localStorage from "local-storage";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red, yellow } from "@material-ui/core/colors";

import "./style/App.scss";

import uuidv1 from "uuid/v1";

import DocumentInputs from "./components/DocumentInputs";
import DocumentOutput from "./components/DocumentOutput";

class App extends Component {
    state = {
        clientInfo: { domain: "", industry: "", comment: "" },
        subpagesGlobalVariables: { metaDescLength: { min: 130, max: 150 } },
        subpages: [],
        orderTypes: [
            {
                value: "contentNew",
                name: "Proszę o przygotowanie nowej treści na stronę.",
                components: [
                    "url",
                    "charactersToWrite",
                    "h1",
                    "hx",
                    "metaDesc",
                    "metaDescLength",
                    "phrases",
                    "inspiration",
                    "comment"
                ]
            },
            {
                value: "contentNewExtendCurrent",
                name: "Proszę o rozszerzenie obecnej treści",
                components: [
                    "url",
                    "charactersToExtendTo",
                    "charactersToWrite",
                    "h1",
                    "hx",
                    "metaDesc",
                    "metaDescLength",
                    "phrases",
                    "inspiration",
                    "comment"
                ]
            },
            {
                value: "contentUpdate",
                name: "Proszę o nasycenie obecnej treści frazami.",
                components: [
                    "url",
                    "charactersToWrite",
                    "metaDesc",
                    "metaDescLength",
                    "phrases",
                    "inspiration",
                    "comment"
                ]
            }
        ]
    };

    handleAddButtonClick = () => {
        const subpages = [
            ...this.state.subpages,
            {
                id: uuidv1(),
                type: this.state.orderTypes[0].value,
                url: "",
                h1: "",
                phrases: "",
                hx: "",
                charactersToExtendTo: "",
                charactersToWrite: "",
                metaDesc: false,
                inspiration: "",
                comment: ""
            }
        ];
        this.setState({
            subpages: subpages
        });
        localStorage.set("subpages", JSON.stringify(subpages));
    };

    handleClearButtonClick = () => {
        this.setState({ subpages: [] });
        localStorage.set("subpages", JSON.stringify([]));
    };

    handleSubpageBoxChange = (event, id, attr) => {
        if (attr === undefined) attr = "value";
        const newSubpages = this.state.subpages.map(subpage => {
            if (subpage.id !== id) return subpage;
            return { ...subpage, [event.target.name]: event.target[attr] };
        });
        this.setState({ subpages: newSubpages });
        localStorage.set("subpages", JSON.stringify(newSubpages));
    };

    render() {
        const {
            clientInfo,
            subpages,
            subpagesGlobalVariables,
            orderTypes
        } = this.state;

        const theme = createMuiTheme({
            palette: {
                primary: red,
                secondary: yellow,
                error: red
            }
        });

        return (
            <ThemeProvider theme={theme}>
                <div className="App container-fluid">
                    <CssBaseline />
                    <div className="row">
                        <DocumentInputs
                            clientInfo={clientInfo}
                            updateClientInfo={event =>
                                this.setState({
                                    clientInfo: {
                                        ...this.state.clientInfo,
                                        [event.target.name]: event.target.value
                                    }
                                })
                            }
                            subpages={subpages}
                            handleSubpageBoxChange={this.handleSubpageBoxChange}
                            handleAddButtonClick={this.handleAddButtonClick}
                            handleClearButtonClick={this.handleClearButtonClick}
                            orderTypes={orderTypes}
                        />
                        <DocumentOutput
                            clientInfo={clientInfo}
                            subpages={subpages}
                            subpagesGlobalVariables={subpagesGlobalVariables}
                            orderTypes={orderTypes}
                        />
                    </div>
                </div>
            </ThemeProvider>
        );
    }

    componentDidMount() {
        if (localStorage.get("subpages") !== null) {
            this.setState({
                subpages: JSON.parse(localStorage.get("subpages"))
            });
        }
    }
}

export default App;
