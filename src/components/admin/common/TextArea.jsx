import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextArea = ({label, val, handleChange}) => {
    const [isFocused, setIsFocused] = useState(false)
  
    return (
        <div className="mb-3 w-full">
            <label className='mb-10 text-black'>{label}</label>
            <ReactQuill theme="snow"
            value={val} 
            onChange={handleChange} />
        </div> 
     );
}
 
export default TextArea;