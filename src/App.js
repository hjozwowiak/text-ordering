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
        settings: {
            colorTheme: {
                darkMode: false,
                palette: {
                    type: "light",
                    primary: red,
                    secondary: yellow,
                    error: red
                }
            },
            metaDescLength: [130, 150]
        },
        clientInfo: { domain: "", industry: "", comment: "" },
        topBarImgsNum: 10,
        topBarImgName: "loading.gif",
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
            },
            {
                value: "contentNewUpdateCurrent",
                name:
                    "Proszę o nasycenie obecnej treści frazami i rozszerzenie",
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
                value: "contentReword",
                name: "Proszę o przeredagowanie obecnej treści.",
                components: [
                    "url",
                    "charactersToWrite",
                    "h1",
                    "hx",
                    "metaDesc",
                    "metaDescLength",
                    "inspiration",
                    "comment"
                ]
            }
        ]
    };

    updateMetaDescLength = (event, newValue) => {
        this.setState({
            settings: {
                ...this.state.settings,
                metaDescLength: newValue
            }
        });
        localStorage.set(
            "settings",
            JSON.stringify({
                ...this.state.settings,
                metaDescLength: newValue
            })
        );
    };

    handleChangeThemeTypeSwitch = event => {
        let newColorTheme = this.state.settings.colorTheme;
        if (event.target.checked === true) {
            newColorTheme = {
                ...this.state.settings.colorTheme,
                darkMode: event.target.checked,
                palette: {
                    ...this.state.settings.colorTheme.palette,
                    type: "dark"
                }
            };
        } else if (event.target.checked === false) {
            newColorTheme = {
                ...this.state.settings.colorTheme,
                darkMode: event.target.checked,
                palette: {
                    ...this.state.settings.colorTheme.palette,
                    type: "light"
                }
            };
        }
        this.setState({
            settings: { ...this.state.settings, colorTheme: newColorTheme }
        });
        localStorage.set(
            "settings",
            JSON.stringify({
                ...this.state.settings,
                colorTheme: newColorTheme
            })
        );
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
        this.triggerPepe();
        const clearSubpages = [],
            clearClientInfo = { domain: "", industry: "", comment: "" };
        this.setState({
            subpages: clearSubpages,
            clientInfo: clearClientInfo
        });
        localStorage.set("subpages", JSON.stringify(clearSubpages));
        localStorage.set("clientInfo", JSON.stringify(clearClientInfo));
    };

    handleRemoveSubpageButtonClick = id => {
        this.triggerPepe();
        const newSubpages = this.state.subpages
            .map(subpage => {
                if (subpage.id !== id) return subpage;
                return null;
            })
            .filter(e => e !== null);
        this.setState({ subpages: newSubpages });
        localStorage.set("subpages", JSON.stringify(newSubpages));
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

    handleClientInfoChange = event => {
        const newClientInfo = {
            ...this.state.clientInfo,
            [event.target.name]: event.target.value
        };
        this.setState({
            clientInfo: newClientInfo
        });
        localStorage.set("clientInfo", JSON.stringify(newClientInfo));
    };

    triggerPepe = () => {
        const currentImg = this.state.topBarImgName;
        this.setState({ topBarImgName: "pepe/triggered.png" });
        setTimeout(
            function() {
                this.setState({ topBarImgName: currentImg });
            }.bind(this),
            500
        );
    };

    componentDidMount() {
        if (localStorage.get("subpages") !== null) {
            this.setState({
                subpages: JSON.parse(localStorage.get("subpages"))
            });
        }
        if (localStorage.get("clientInfo") !== null) {
            this.setState({
                clientInfo: JSON.parse(localStorage.get("clientInfo"))
            });
        }
        if (localStorage.get("settings") !== null) {
            this.setState({
                settings: JSON.parse(localStorage.get("settings"))
            });
        }

        this.setState({
            topBarImgName:
                "pepe/" +
                Math.round(Math.random() * (this.state.topBarImgsNum - 1) + 1) +
                ".png"
        });
    }

    render() {
        const {
            settings,
            clientInfo,
            topBarImgName,
            subpages,
            orderTypes
        } = this.state;

        const theme = createMuiTheme(settings.colorTheme);

        return (
            <ThemeProvider theme={theme}>
                <div className="App container-fluid">
                    <CssBaseline />
                    <div className="row">
                        <DocumentInputs
                            settings={settings}
                            updateMetaDescLength={this.updateMetaDescLength}
                            handleChangeThemeTypeSwitch={
                                this.handleChangeThemeTypeSwitch
                            }
                            clientInfo={clientInfo}
                            updateClientInfo={event => {
                                this.handleClientInfoChange(event);
                            }}
                            topBarImgName={topBarImgName}
                            subpages={subpages}
                            handleRemoveSubpageButtonClick={
                                this.handleRemoveSubpageButtonClick
                            }
                            handleSubpageBoxChange={this.handleSubpageBoxChange}
                            handleAddButtonClick={this.handleAddButtonClick}
                            handleClearButtonClick={this.handleClearButtonClick}
                            orderTypes={orderTypes}
                        />
                        <DocumentOutput
                            clientInfo={clientInfo}
                            subpages={subpages}
                            metaDescLength={settings.metaDescLength}
                            orderTypes={orderTypes}
                        />
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
