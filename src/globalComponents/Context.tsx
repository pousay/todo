import React from "react";
export interface settingContextType {
  theme: "dark" | "light";
  sounds: boolean;
  deleteOnDone: boolean;
}
export const settingContextValue: settingContextType = {
  theme: "dark",
  sounds: true,
  deleteOnDone: false,
};
export const SettingContext = React.createContext<{
  settings: settingContextType;
  setSettings: any;
}>({ settings: settingContextValue, setSettings: () => {} });
