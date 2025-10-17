import React from 'react';

interface UndoToastProps {
  isOpen: boolean;
  onUndo: () => void;
  message?: string;
}

const UndoToast: React.FC<UndoToastProps> = ({ isOpen, onUndo, message = "Order updated." }) => {
  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-live="polite"
    >
      <div className="bg-surface-container-highest-light dark:bg-surface-container-highest-dark text-on-surface-light dark:text-on-surface-dark rounded-full shadow-lg flex items-center px-4 py-3">
        <span className="mr-4 text-sm">{message}</span>
        <button
          onClick={onUndo}
          className="font-bold text-sm uppercase text-primary-light dark:text-primary-dark hover:opacity-80 focus:outline-none"
        >
          Undo
        </button>
      </div>
    </div>
  );
};

export default UndoToast;
