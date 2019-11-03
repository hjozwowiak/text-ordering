import React, { Component } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

import "./style/App.scss";

import uuidv1 from "uuid/v1";

import DocumentInputs from "./components/DocumentInputs";
import DocumentOutput from "./components/DocumentOutput";

class App extends Component {
    state = {
        clientInfo: { domain: "", industry: "", comment: "" },
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
        this.setState(state => ({
            subpages: [
                ...state.subpages,
                {
                    id: uuidv1(),
                    type: state.orderTypes[0].value,
                    url: "",
                    h1: "",
                    phrases: "",
                    hx: "",
                    charactersToExtendTo: "",
                    charactersToWrite: "",
                    metaDesc: false,
                    metaDescLength: { min: 130, max: 150 },
                    inspiration: "",
                    comment: ""
                }
            ]
        }));
    };

    handleSubpageBoxChange = (event, id, attr) => {
        if (attr === undefined) attr = "value";
        const newSubpages = this.state.subpages.map(subpage => {
            if (subpage.id !== id) return subpage;
            return { ...subpage, [event.target.name]: event.target[attr] };
        });
        this.setState({ subpages: newSubpages });
    };

    render() {
        const theme = createMuiTheme({
            palette: {
                primary: red,
                secondary: red
                // primary: {
                //     light: palette.primary[300],
                //     main: palette.primary[500],
                //     dark: palette.primary[700],
                //     contrastText: getContrastText(palette.primary[500]),
                //   },
                // secondary: {
                //     light: palette.secondary.A200,
                //     main: palette.secondary.A400,
                //     dark: palette.secondary.A700,
                //     contrastText: getContrastText(palette.secondary.A400),
                //   },
                // error: {
                //     light: palette.error[300],
                //     main: palette.error[500],
                //     dark: palette.error[700],
                //     contrastText: getContrastText(palette.error[500]),
                //   }
            }
        });

        const { clientInfo, subpages, orderTypes } = this.state;

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
                            orderTypes={orderTypes}
                        />
                        <DocumentOutput
                            clientInfo={clientInfo}
                            subpages={subpages}
                            orderTypes={orderTypes}
                        />
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
