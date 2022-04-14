import { useContext } from "react";
import { SettingsContext } from "../contexts/settingContext";

const RadioButton = ({ name, value, label }) => {
  const { settings, setSettings } = useContext(SettingsContext);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        checked={settings?.[name] === value}
        onChange={handleChange}
      />
      {label}
    </label>
  );
};

export default RadioButton;
