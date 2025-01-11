import { useState, useRef, useEffect } from "react";
import EyeSlashIcon from "../icons/EyeSlashIcon";

export default function InputComplet({
    label,
    type,
    name,
    value,
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

    // Gestionnaire de clic en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleInputChange = async (e) => {
        const inputValue = e.target.value;

        // Mettre à jour le libellé affiché
        setDisplayValue(inputValue);

        // Appeler onChange pour synchroniser les données externes
        if (onChange) {
            onChange({ target: { name, value: "" } }); // Reset le code temporairement
        }

        // Si pas de fetchSuggestions, arrêtez ici
        if (!fetchSuggestions) return;

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
        const [id, label] = suggestion.split(" - "); // Sépare le code et le libellé

        // Mettre à jour le libellé affiché dans l'input
        setDisplayValue(label);

        // Simuler un événement pour transmettre le code réel
        const syntheticEvent = {
            target: {
                name,
                value: id, // Utiliser l'id comme valeur réelle
            },
        };

        if (onChange) onChange(syntheticEvent); // Transmettre l'id via onChange
        if (onSelect) onSelect({ id, label }); // Transmettre l'objet complet via onSelect

        setIsOpen(false);
        setActiveIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && activeIndex >= 0) {
            handleSelect(filteredSuggestions[activeIndex]);
        }
    };

    const highlightText = (text, query) => {
        if (!query) return text;

        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <span key={index} className="bg-yellow-200">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    return (
        <div className={`w-full mb-4 flex flex-col ${className}`} ref={wrapperRef}>
            <label className="mb-2">{label}</label>
            <div className="relative text-black">
                <input
                    name={name}
                    type={show ? "text" : type}
                    placeholder={placeholder}
                    value={displayValue} // Affiche le libellé dans l'input
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => displayValue && fetchSuggestions && fetchSuggestions(displayValue)}
                    className={`w-full rounded-md border border-black px-4 py-2 bg-white focus:outline-none focus:border-primary ${
                        error ? "border-danger" : ""
                    }`}
                    disabled={disabled}
                />

                {type === "password" && (
                    <span
                        className="absolute right-2 top-2 hover:cursor-pointer"
                        onClick={() => setShow(!show)}
                    >
                        {show ? <EyeIcon /> : <EyeSlashIcon />}
                    </span>
                )}

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
                                    <span className="font-bold">{highlightText(libelle, displayValue)}</span>
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
