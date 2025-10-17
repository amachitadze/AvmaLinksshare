import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from './icons.tsx';

interface ContextMenuProps {
  position: { x: number; y: number };
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ position, onClose, onEdit, onDelete }) => {
  const menuStyle: React.CSSProperties = {
    top: `${position.y}px`,
    left: `${position.x}px`,
  };

  const menuContent = (
    <div
      style={menuStyle}
      className="fixed z-50 bg-surface-container-light dark:bg-surface-container-dark rounded-md shadow-xl border border-outline-variant-light dark:border-outline-variant-dark py-2 w-40"
    >
      <ul>
        <li>
          <button
            onClick={onEdit}
            className="w-full flex items-center px-4 py-2 text-sm text-on-surface-light dark:text-on-surface-dark hover:bg-surface-container-high-light dark:hover:bg-surface-container-high-dark"
          >
            <Icon name="pencil" className="w-4 h-4 mr-3" />
            <span>Edit</span>
          </button>
        </li>
        <li>
          <button
            onClick={onDelete}
            className="w-full flex items-center px-4 py-2 text-sm text-error-light dark:text-error-dark hover:bg-surface-container-high-light dark:hover:bg-surface-container-high-dark"
          >
            <Icon name="trash" className="w-4 h-4 mr-3" />
            <span>Delete</span>
          </button>
        </li>
      </ul>
    </div>
  );

  return ReactDOM.createPortal(menuContent, document.body);
};

export default ContextMenu;