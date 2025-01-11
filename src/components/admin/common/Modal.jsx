import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300); // Durée de l'animation
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 ease-out`}>
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div
        className={`bg-white py-5 px-10 rounded shadow-lg z-10 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-300 ease-out`}
      >
        {title && (
          <div className='flex w-full justify-between border-slate-200 border-b pb-2'>
            <p className='text-primary font-bold text-md'>{title}</p>
            <span onClick={onClose} className='cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;