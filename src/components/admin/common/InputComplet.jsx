import { useState, useRef, useEffect } from "react";
import EyeSlashIcon from "../icons/EyeSlashIcon";

export default function InputComplet({
    label,
    type,
    name,
    value, // L'ID actuel
    placeholder,
    onChange,
    error,
    className,
    disabled,
    datas = [],
    suggestions = [],
    onSelect,
    minChars = 0,
    fetchSuggestions = null
  }) {
    const [show, setShow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [displayValue, setDisplayValue] = useState(""); // Stocke le libellé affiché
    const wrapperRef = useRef(null);
  
    useEffect(() => {
      // Mettre à jour le libellé affiché si la valeur change de l'extérieur
      const selectedItem = datas.find((item) => item.id === value);
      if (selectedItem) {
        setDisplayValue(`${selectedItem.nom} - ${selectedItem.prenom}`);
      }
    }, [value, datas]);
  
    const handleInputChange = async (e) => {
      const inputValue = e.target.value;
      setDisplayValue(inputValue);
  
      if (onChange) {
        // Réinitialise la valeur à vide tant qu'une suggestion n'est pas sélectionnée
        onChange({ target: { name, value: "" } });
      }
  
      if (!fetchSuggestions || inputValue.trim().length < minChars) {
        setIsOpen(false);
        setFilteredSuggestions([]);
        return;
      }
  
      try {
        setLoading(true);
        const suggestions = await fetchSuggestions(inputValue);
        setFilteredSuggestions(suggestions);
        setIsOpen(suggestions.length > 0);
      } catch (error) {
        console.error("Erreur suggestions:", error);
        setFilteredSuggestions([]);
      } finally {
        setLoading(false);
      }
    };
  
    const handleSelect = (suggestion) => {
      const [id, label] = suggestion.split(" - ");
  
      setDisplayValue(label); // Affiche le libellé sélectionné
      if (onChange) onChange({ target: { name, value: id } }); // Met à jour l'ID réel
      if (onSelect) onSelect({ id, label });
  
      setIsOpen(false);
      setActiveIndex(-1);
    };
  
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && activeIndex >= 0) {
        handleSelect(filteredSuggestions[activeIndex]);
      }
    };
  
    return (
      <div className={`w-full mb-4 flex flex-col ${className}`} ref={wrapperRef}>
        <label className="mb-2">{label}</label>
        <div className="relative text-black">
          <input
            name={name}
            type={show ? "text" : type}
            placeholder={placeholder}
            value={displayValue} // Libellé affiché
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => displayValue && fetchSuggestions && fetchSuggestions(displayValue)}
            className={`w-full rounded-md border border-black px-4 py-2 bg-white focus:outline-none focus:border-primary ${
              error ? "border-danger" : ""
            }`}
            disabled={disabled}
          />
  
          {loading && (
            <div className="absolute right-3 top-2.5">
              <div className="animate-spin h-5 w-5 border-2 border-primary rounded-full border-t-transparent"></div>
            </div>
          )}
  
          {isOpen && filteredSuggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white border border-black rounded-md shadow-lg">
              {filteredSuggestions.map((suggestion, index) => {
                const [code, libelle] = suggestion.split(" - ");
                return (
                  <li
                    key={index}
                    onClick={() => handleSelect(suggestion)}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      index === activeIndex ? "bg-gray-200" : ""
                    }`}
                  >
                    {libelle}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {error && <span className="text-danger">{error}</span>}
      </div>
    );
  }
  
