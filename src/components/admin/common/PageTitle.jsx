import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Typewriter from './TypeWriter';

const PageTitle = ({ path }) => {
  const location = useLocation();

  useEffect(() => {
    const array = path.split('/')
    document.title = array[array.length - 1].toUpperCase() + ' | SCOLARITE';
  }, [location, path]);

  return(
    <div className='bg-white shadow-lg pr-10 font-medium h-12 flex justify-end items-center'>
      <Typewriter 
        text={path.toUpperCase()}
      />
    </div>
  );
};

export default PageTitle;