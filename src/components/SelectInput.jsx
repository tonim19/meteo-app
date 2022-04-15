import { useContext } from "react";
import { SettingsContext } from "../contexts/settingContext";

function SelectInput({ name, variables, value }) {
  const { settings, setSettings } = useContext(SettingsContext);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  return (
    <select name={name} value={value} onChange={handleChange}>
      {variables?.map(({ id, value, label }) => {
        return (
          <option key={id} value={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
}

export default SelectInput;
