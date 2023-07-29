import LuminaireSettings from "./components/LuminaireSettings/LuminaireSettings";
import { Settings } from "./components/LuminaireSettings/LuminaireSettings.type";

const App = () => {
  /**
   * Function to handle emitted settings
   */
  const settingsHandler = (settings: Settings) => {
    // Add logic for handling emitted settings
    console.log(settings);
  };

  return (
    <LuminaireSettings
      settingsEmitter={(settings: Settings) => settingsHandler(settings)}
    />
  );
};

export default App;
