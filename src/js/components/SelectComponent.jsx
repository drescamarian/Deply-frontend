import { useEffect, useState } from 'react';

const SelectComponent = ({ title, selected, values, onChange }) => {
  // Zustand für die ausgewählte Option
  const [selectedOption, setSelectedOption] = useState(selected || values[0]);
  // // Bei Änderungen der ausgewählten Option soll der Zustand aktualisiert werden
  useEffect(() => {
    if (selected) {
      setSelectedOption(selected);
    }
  }, [selected]);

  console.log(selectedOption);

  // Handler-Funktion für Änderungen der Auswahl
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div>
      <label htmlFor={title} >{title}</label>
      <select value={selectedOption} onChange={handleSelectChange} >
        {values.map(value => { return <option key={value} value={value}>{value}</option> })}
      </select>
    </div>
  );
};

export default SelectComponent;
