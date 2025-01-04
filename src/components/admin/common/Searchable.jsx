import { ChangeEvent, useEffect, useState } from "react";
import HighlightText from "./HighlightText";
import { Input } from "./Input";
import { search } from "../../../utils/utils";



const Searchable = ({
    label, 
    headColumns, 
    bodyColumns, 
    searchColumns, 
    data, 
    searchFunction, 
    showData
}) => {
    const [items, setItems] = useState([]); // Typage du state `items`
    const [searchText, setSearchText] = useState<string>(""); // Typage du state `searchText`

    // Mise à jour des `items` lorsque `data` change
    useEffect(() => {
        setItems(data);
    }, [data]);

    const updateData = (e) => {
        const text = e.target.value;
        setSearchText(text);

        if (text === '') {
            setItems([]);
        } else if (searchFunction && text.length > 2) {
            searchFunction({ [searchColumns[0]]: text }, 'data');
        } else if (data && !searchFunction) {
            setItems(search(data, searchColumns, text.toLowerCase()));
        } else {
            setItems([]);
        }
    };

    const show = (item, key) => {
        const keys = key.split('.');
        let result = item;

        for (let i = 0; i < keys.length; i++) {
            result = result[keys[i]];
        }

        return result;
    };

    return (
        <div className="w-full">
            <Input 
                type="text" 
                placeholder="Rechercher" 
                onChange={updateData} 
                label={label} 
                value={searchText} 
            />
            <div
                className={`absolute w-auto max-h-64 overflow-y-scroll bg-white text-black shadow-lg rounded-md flex flex-col z-99 ${items.length > 0 ? 'block' : 'hidden'}`}
            >
                {items.length > 0 && searchText.length > 0 && (
                    <span
                        onClick={() => { showData(items); setSearchText(''); setItems([]); }}
                        className="flex self-end m-2 text-secondary font-bold italic hover:cursor-pointer"
                    >
                        Voir plus
                    </span>
                )}
                {searchText.length > 0 && items.map((item, index) => (
                    <div 
                        key={index} 
                        onClick={() => { showData([item]); setSearchText(''); setItems([]); }} 
                        className="p-1 hover:cursor-pointer hover:bg-secondary hover:text-white"
                    >
                        {searchColumns.map((col, indexCol) => (
                            <span className="mx-1" key={indexCol}>
                                <HighlightText text={show(item, col)} highlight={searchText} />
                            </span>
                        ))}
                        <span>{'('}</span>
                        {bodyColumns.map((col, indexCol) => (
                            <span key={indexCol} className="ml-1">
                                {headColumns[indexCol] + " : " + show(item, col) + " ; "}
                            </span>
                        ))}
                        <span>{')'}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Searchable;
