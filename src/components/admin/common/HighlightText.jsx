
const HighlightText = ({ text, highlight }) =>{

    const escapeRegExp = (string ) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
  
    const parts = text.split(new RegExp(`(${escapeRegExp(highlight)})`, 'gi'));
  
    return (
      <span>
        {parts.map((part, index) => 
          part.toLowerCase() === highlight.toLowerCase() ? <strong key={index}>{part}</strong> : part
        )}
      </span>
    );
  }

  export default HighlightText;