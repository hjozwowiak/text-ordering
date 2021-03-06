import React, { Component } from "react";
import localStorage from "local-storage";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./style/App.scss";

import * as constantsOrderTypes from "./shared/constants/constants.orderTypes";
import * as constantsImgsTopBar from "./shared/constants/constants.topBarImgs";
import * as constantsDefaultTheme from "./shared/constants/constants.defaultTheme";

import uuidv1 from "uuid/v1";

import DocumentInputs from "./components/DocumentInputs";
import DocumentOutput from "./components/DocumentOutput";
import AlertModal from "./components/AlertModal/AlertModal";

class App extends Component {
  state = {
    settings: {
      colorTheme: constantsDefaultTheme.defaultTheme,
      metaDescLength: [130, 150],
    },
    clientInfo: { domain: "", industry: "", comment: "" },
    topBarImgName: "loading.gif",
    subpages: [],
    dialog: {
      open: false,
      messageHead: "",
      messageBody: "",
      customAction: () => {},
    },
  };

  muiTheme =
    localStorage.get("settings") !== null
      ? createMuiTheme(JSON.parse(localStorage.get("settings")).colorTheme)
      : createMuiTheme(constantsDefaultTheme.defaultTheme);

  updateMetaDescLength = (newValue) => {
    this.setState({
      settings: {
        ...this.state.settings,
        metaDescLength: newValue,
      },
    });
    localStorage.set(
      "settings",
      JSON.stringify({
        ...this.state.settings,
        metaDescLength: newValue,
      })
    );
  };

  handleChangeThemeTypeSwitch = (event) => {
    let newColorTheme = this.state.settings.colorTheme;
    if (event.target.checked === true) {
      newColorTheme = {
        ...this.state.settings.colorTheme,
        darkMode: event.target.checked,
        palette: {
          ...this.state.settings.colorTheme.palette,
          type: "dark",
        },
      };
    } else if (event.target.checked === false) {
      newColorTheme = {
        ...this.state.settings.colorTheme,
        darkMode: event.target.checked,
        palette: {
          ...this.state.settings.colorTheme.palette,
          type: "light",
        },
      };
    }
    this.setState({
      settings: { ...this.state.settings, colorTheme: newColorTheme },
    });
    localStorage.set(
      "settings",
      JSON.stringify({
        ...this.state.settings,
        colorTheme: newColorTheme,
      })
    );

    window.location.reload();
  };

  createSubpageObject = () => {
    return {
      id: uuidv1(),
      type: Object.keys(constantsOrderTypes.orderTypes)[0],
      url: "",
      new: false,
      h1: "",
      phrases: "",
      commonWords: "",
      hx: "",
      charactersToExtendTo: "",
      charactersToWrite: "",
      metaDesc: false,
      inspiration: "",
      comment: "",
      folded: false,
    };
  };

  handleSubpageBoxAdd = (insertAtIndex, data) => {
    let subpages = this.state.subpages;
    if (data === undefined) {
      subpages.splice(insertAtIndex, 0, this.createSubpageObject());
    } else {
      subpages.splice(insertAtIndex, 0, { ...data, id: uuidv1() });
    }
    this.setState({
      subpages: subpages,
    });
    localStorage.set("subpages", JSON.stringify(subpages));
  };

  onAddButtonClick = () => {
    this.handleSubpageBoxAdd(this.state.subpages.length);
  };

  onDuplicateButtonClick = (newSubpageIndex, subpageData) => {
    this.handleSubpageBoxAdd(newSubpageIndex, { ...subpageData, url: "" });
  };

  runModal = (messageHead, messageBody, customAction) => {
    this.setState({
      dialog: {
        ...this.dialog,
        open: true,
        messageHead: messageHead,
        messageBody: messageBody,
        customAction: customAction,
      },
    });
  };

  clearOrder = () => {
    this.triggerPepe();
    const clearSubpages = [],
      clearClientInfo = { domain: "", industry: "", comment: "" };
    this.setState({
      subpages: clearSubpages,
      clientInfo: clearClientInfo,
    });
    localStorage.set("subpages", JSON.stringify(clearSubpages));
    localStorage.set("clientInfo", JSON.stringify(clearClientInfo));
  };

  handleClearButtonClick = () => {
    this.runModal(
      "Usunięcie danych zamówienia",
      "Nastąpi usunięcie wszystkich danych zamówienia. Operacja jest nieodwracalna.",
      this.clearOrder
    );
  };

  removeSubpage = (id) => {
    this.triggerPepe();
    const newSubpages = this.state.subpages
      .map((subpage) => {
        if (subpage.id !== id) return subpage;
        return null;
      })
      .filter((e) => e !== null);
    this.setState({ subpages: newSubpages });
    localStorage.set("subpages", JSON.stringify(newSubpages));
  };

  handleRemoveSubpageButtonClick = (id) => {
    this.runModal(
      "Usunięcie podstrony",
      "Nastąpi usunięcie podstrony i wszystkich powiązanych z nią danych. Operacja jest nieodwracalna.",
      () => {
        this.removeSubpage(id);
      }
    );
  };

  handleSubpageBoxChange = (event, id, attr, name) => {
    let newValue = "";
    if (typeof attr === "boolean") {
      newValue = attr;
    } else if (attr === undefined) {
      newValue = event.target.value;
    } else {
      newValue = event.target[attr];
    }

    if (name === undefined) {
      name = event.target.name;
    }

    const newSubpages = this.state.subpages.map((subpage) => {
      if (subpage.id !== id) return subpage;
      return { ...subpage, [name]: newValue };
    });
    this.setState({ subpages: newSubpages });

    localStorage.set("subpages", JSON.stringify(newSubpages));
  };

  handleClientInfoChange = (event) => {
    const newClientInfo = {
      ...this.state.clientInfo,
      [event.target.name]: event.target.value,
    };
    this.setState({
      clientInfo: newClientInfo,
    });
    localStorage.set("clientInfo", JSON.stringify(newClientInfo));
  };

  onToggleFoldInputBoxButtonClick = (mode) => {
    /**
     * @param {string} mode Mode of a funtion - "expand" or "fold".
     */
    let folded;
    if (mode === "expand") {
      folded = false;
    } else if (mode === "fold") {
      folded = true;
    }
    const newSubpages = this.state.subpages.map((subpage) => {
      if (subpage["folded"] !== folded) return { ...subpage, folded: folded };
      return subpage;
    });
    this.setState({ subpages: newSubpages });
  };

  triggerPepe = () => {
    const currentImg = this.state.topBarImgName;
    this.setState({ topBarImgName: "pepe/triggered.png" });
    setTimeout(
      function () {
        this.setState({ topBarImgName: currentImg });
      }.bind(this),
      500
    );
  };

  componentDidMount() {
    if (localStorage.get("subpages") !== null) {
      this.setState({
        subpages: JSON.parse(localStorage.get("subpages")),
      });
    }
    if (localStorage.get("clientInfo") !== null) {
      this.setState({
        clientInfo: JSON.parse(localStorage.get("clientInfo")),
      });
    }
    if (localStorage.get("settings") !== null) {
      this.setState({
        settings: JSON.parse(localStorage.get("settings")),
      });
    }

    this.setState({
      topBarImgName:
        "pepe/" +
        Math.round(Math.random() * (constantsImgsTopBar.imgsNum - 1) + 1) +
        ".png",
    });
  }

  render() {
    const {
      settings,
      clientInfo,
      topBarImgName,
      subpages,
      dialog,
    } = this.state;

    return (
      <ThemeProvider theme={this.muiTheme}>
        <div className="App container-fluid">
          <CssBaseline />
          <div className="row">
            <DocumentInputs
              settings={settings}
              updateMetaDescLength={this.updateMetaDescLength}
              handleChangeThemeTypeSwitch={this.handleChangeThemeTypeSwitch}
              clientInfo={clientInfo}
              updateClientInfo={(event) => {
                this.handleClientInfoChange(event);
              }}
              triggerPepe={this.triggerPepe}
              topBarImgName={topBarImgName}
              subpages={subpages}
              handleRemoveSubpageButtonClick={
                this.handleRemoveSubpageButtonClick
              }
              handleSubpageBoxChange={this.handleSubpageBoxChange}
              runModal={this.runModal}
              onAddButtonClick={this.onAddButtonClick}
              onDuplicateButtonClick={this.onDuplicateButtonClick}
              handleClearButtonClick={this.handleClearButtonClick}
              handleToggleFoldAllButtonClick={
                this.onToggleFoldInputBoxButtonClick
              }
              handleFoldBoxStatusUpdate={(event) => {
                this.handleFoldBoxStatusUpdate(event);
              }}
              createSubpageObject={this.createSubpageObject}
              updateWholeSubpagesObject={(subpages) => {
                this.setState({ subpages });
              }}
            />
            <DocumentOutput
              clientInfo={clientInfo}
              subpages={subpages}
              metaDescLength={settings.metaDescLength}
            />
          </div>
        </div>
        <AlertModal
          open={dialog.open}
          handleClose={() =>
            this.setState({ dialog: { ...dialog, open: false } })
          }
          messageHead={dialog.messageHead}
          messageBody={dialog.messageBody}
          customAction={dialog.customAction}
        />
      </ThemeProvider>
    );
  }
}

export default App;
