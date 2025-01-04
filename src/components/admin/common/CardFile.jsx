import Icon from './Icon';

const CardFile = ({className, children}) => {
    return ( 
        <div className={`grid grid-rows-1 ${className} border border-white-700 bg-white-500 rounded-lg shadow-md`}>
            {children}
        </div>

     );
}
 
export default CardFile;