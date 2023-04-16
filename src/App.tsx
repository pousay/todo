import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Setting from "./pages/settings/setting";
import Todos from "./pages/mainpage/Todos";
import Info from "./pages/info/info";
import {
  settingContextType,
  SettingContext,
  settingContextValue,
} from "./globalComponents/Context";
import { useEffect, useState } from "react";
function App() {
  const [setting, setSetting] =
    useState<settingContextType>(settingContextValue);

  useEffect(() => {
    if (setting.theme === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [setting]);

  return (
    <>
      <BrowserRouter>
        <SettingContext.Provider
          value={{ settings: setting, setSettings: setSetting }}
        >
          <Routes>
            <Route path="/" Component={Todos} />
            <Route path="/setting" Component={Setting} />
            <Route path="/info" Component={Info} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SettingContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
