import { useContext } from "react";
import { SettingContext } from "../globalComponents/Context";
import Navbar from "../globalComponents/Navbar";

function Setting() {
  const { settings, setSettings } = useContext(SettingContext);

  const changeTheme = () => {
    if (settings.theme === "dark") {
      setSettings({
        ...settings,
        theme: "light",
      });
    } else if (settings.theme === "light") {
      setSettings({
        ...settings,
        theme: "dark",
      });
    }
  };

  const switchOthers = (item: "sounds" | "deleteOnDone") => {
    setSettings({
      ...settings,
      [item]: !settings[item],
    });
  };

  return (
    <>
      <Navbar what={2} />
      <main className="settings">
        <div className="set-each">
          <p>Dark Mode :</p>
          <label
            className={settings.theme === "dark" ? "switch done" : "switch"}
          >
            <input type="checkbox" onClick={changeTheme} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="set-each">
          <p>Sounds :</p>
          <label className={settings.sounds ? "switch done" : "switch"}>
            <input
              type="checkbox"
              onClick={() => {
                switchOthers("sounds");
              }}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="set-each">
          <p>Delete On Done :</p>
          <label className={settings.deleteOnDone ? "switch done" : "switch"}>
            <input
              type="checkbox"
              onClick={() => {
                switchOthers("deleteOnDone");
              }}
            />
            <span className="slider"></span>
          </label>
        </div>
      </main>
    </>
  );
}

export default Setting;
