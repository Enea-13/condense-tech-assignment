import { useState } from "react";
import styles from "./Pagination.module.css";

const options = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
];

const LimitPerView = ({ onSelect }: { onSelect: (value: number) => void }) => {
  const [selectedOption, setSelectedOption] = useState(options[1]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: (typeof options)[number]) => {
    onSelect(option.value);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownToggle} onClick={handleToggle}>
        {selectedOption ? selectedOption.label : "Select an option"}
      </button>
      <span style={{ fontSize: "12px", fontWeight: "300" }}>
        <i> (per page)</i>
      </span>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option) => (
            <li key={option.value} onClick={() => handleSelectOption(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LimitPerView;
