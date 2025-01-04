import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export function toCapitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const exportExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
};

export const search = (items, columns, text) => {
    const searchInObject = (obj, keys, text) => {
        if (keys.length === 0) {
            return false;
        }
        const [firstKey, ...remainingKeys] = keys;
        if (Array.isArray(obj[firstKey])) {
            return obj[firstKey].some((item) => searchInObject(item, remainingKeys, text));
        } else if (typeof obj[firstKey] === 'object' && obj[firstKey] !== null) {
            return searchInObject(obj[firstKey], remainingKeys, text);
        } else {
            return obj[firstKey] && obj[firstKey].toString().toLowerCase().includes(text.toLowerCase());
        }
    };

    return items.filter(item => 
        columns.some(column => 
            searchInObject(item, column.split('.'), text)
        )
    );
};

export const transformDate = (dateStr) => {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const replaceNullValues = (obj) => {
    if (obj && typeof obj === 'object') {
        Object.keys(obj).forEach(key => {
            if (obj[key] === null) {
                obj[key] = "";
            } else if (typeof obj[key] === 'object') {
                replaceNullValues(obj[key]);
            }
        });
    }
    return obj;
}

export function download(url, name) {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = name;
  
    document.body.appendChild(downloadLink);
  
    downloadLink.click();
  
    document.body.removeChild(downloadLink);
}
