import React, { ReactNode, useEffect } from "react";
import "./Modal.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    
    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
    
        return () => {
          document.body.style.overflow = "auto";
        };
      }, [isOpen]);

    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
