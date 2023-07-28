import { Alert } from "@mui/material";
import { AppContainer, AppButton } from "./App.style";
import { Settings, onChangeKey } from "./App.type";
import Setting from "./components/Setting/Setting";
import { useEffect, useState } from "react";

const App = () => {
  const initialSettings = {
    occupied: 80,
    powerSave: 20,
    minimum: 0,
  };
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [lastAppliedSetting, setLastAppliedSetting] =
    useState<Settings>(initialSettings);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [buttonsActive, setButtonsActive] = useState<boolean>(false);

  useEffect(() => {
    if (JSON.stringify(settings) !== JSON.stringify(lastAppliedSetting)) {
      setButtonsActive(true);
    } else {
      setButtonsActive(false);
    }
  }, [settings, lastAppliedSetting]);

  /**
   * Function called when value changes for sliders
   */
  const handleChange = (value: number, key: onChangeKey) => {
    const newSettings = { ...settings };
    newSettings[key] = value;
    switch (key) {
      case "occupied":
        if (value < settings.minimum) {
          newSettings.minimum = value;
        }
        if (value < settings.powerSave) {
          newSettings.powerSave = value;
        }
        break;
      case "powerSave":
        if (value < settings.minimum) {
          newSettings.minimum = value;
        }
        if (value > settings.occupied) {
          newSettings.occupied = value;
        }
        break;
      case "minimum":
        if (value > settings.powerSave) {
          newSettings.powerSave = value;
        }
        if (value > settings.occupied) {
          newSettings.occupied = value;
        }
        break;
    }
    setSettings(newSettings);
  };

  /**
   * Function called when 'Apply' or 'Cancel' button is clicked
   */
  const buttonClickHandler = (isApply?: boolean) => {
    isApply ? setLastAppliedSetting(settings) : setSettings(lastAppliedSetting);
    setAlertMessage(`Settings ${isApply ? "Applied" : "Canceled"}`);
    console.log(
      `${
        isApply ? JSON.stringify(settings) : JSON.stringify(lastAppliedSetting)
      }`
    );
    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };

  return (
    <AppContainer className="App">
      <h2 className="title">Set Levels</h2>
      <Setting
        id="occupied"
        heading="Occupied"
        value={settings?.occupied}
        handleChange={(value: number) => handleChange(value, "occupied")}
      ></Setting>
      <Setting
        id="power-save"
        heading="Power Save"
        value={settings?.powerSave}
        handleChange={(value: number) => handleChange(value, "powerSave")}
      ></Setting>
      <Setting
        id="minimum"
        heading="Minimum"
        value={settings?.minimum}
        handleChange={(value: number) => handleChange(value, "minimum")}
      ></Setting>
      <div className="buttons-container">
        <AppButton
          disabled={!buttonsActive}
          onClick={() => buttonClickHandler()}
        >
          Cancel
        </AppButton>
        <AppButton
          disabled={!buttonsActive}
          primary
          onClick={() => buttonClickHandler(true)}
        >
          Apply
        </AppButton>
      </div>
      <div className="toast-container">
        {alertMessage && <Alert severity="info">{alertMessage}</Alert>}
      </div>
    </AppContainer>
  );
};

export default App;
