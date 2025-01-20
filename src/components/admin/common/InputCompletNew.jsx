import React, { useEffect, useState } from "react";

const InputCompletNew = ({
    suggestions,
    onChange,
    onSelect,
    name,
    labelKey = "nom",
    subLabelKey,
    valueKey = "id",
    defaultValue,
    label, className
  }) => {
    const [displayValue, setDisplayValue] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
  
    
  // Initialiser la valeur par défaut
  useEffect(() => {
    if (defaultValue) {
      setDisplayValue(defaultValue[labelKey] || "");
    }
  }, [defaultValue, labelKey]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDisplayValue(value);

    const filtered = suggestions.filter((suggestion) =>
      suggestion[labelKey].toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSuggestions(filtered);
    setIsOpen(filtered.length > 0);
    setActiveIndex(-1);

    if (onChange) {
      const syntheticEvent = {
        target: { name, value },
      };
      onChange(syntheticEvent);
    }
  };

  const handleSelect = (suggestion) => {
    setDisplayValue(suggestion[labelKey]);

    const syntheticEvent = {
      target: {
        name,
        value: suggestion,
      },
    };

    if (onChange) onChange(syntheticEvent);
    if (onSelect) onSelect(suggestion);

    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Enter" && activeIndex !== -1) {
      handleSelect(filteredSuggestions[activeIndex]);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <div className={`w-full mb-4 flex flex-col ${className}`} >
        <label className="mb-2">{label}</label>
        <div className="relative text-black">
      <input
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder="Rechercher..."
        className="w-full rounded-md border border-black px-4 py-2 bg-white focus:outline-none focus:border-primary"
      />
      {isOpen && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto z-10">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion[valueKey]}
              onClick={() => handleSelect(suggestion)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                index === activeIndex ? "bg-gray-200" : ""
              }`}
            >
              <span className="font-bold">{suggestion[labelKey]}</span>
              {subLabelKey && (
                <span className="text-gray-500 ml-2">
                  {suggestion[subLabelKey]}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default InputCompletNew;
