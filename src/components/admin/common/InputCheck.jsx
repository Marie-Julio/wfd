import { useEffect, useState } from "react";
import ToggleOffIcon from "../icons/ToogleOffIcon";
import ToggleOnIcon from "../icons/ToggleOnIcon";

export default function InputCheck({ label, name, value, onChange, error, className, disabled }) {
    
    const [switched, setSwitched] = useState(value);

    const handleSwitched = () => {
        if (!disabled) {
            const newSwitched = !switched;
            setSwitched(newSwitched);

            // Créer un événement synthétique pour Formik
            const syntheticEvent = {
                target: {
                    name: name,
                    value: newSwitched,
                    type: 'checkbox',
                    checked: newSwitched
                }
            };
            
            if (onChange) {
                onChange(syntheticEvent);
            }
        }
    };

    useEffect(() => {
        setSwitched(value); // Met à jour `switched` si `value` change
    }, [value]);

    return (
        <div className="flex items-center mb-3">
            <span className={`hover:cursor-pointer ${switched ? 'text-secondary' : 'text-blueGray-900'}`} onClick={handleSwitched}>
                {switched ? <ToggleOnIcon /> : <ToggleOffIcon />}
            </span>
            <span className={`block mx-2 ${className} ${error && 'text-danger'}`}>
                {error ? error : label}
            </span>
            <input id={name} type="checkbox" name={name} checked={switched} onChange={onChange} className="hidden" />
        </div>
    );
}
