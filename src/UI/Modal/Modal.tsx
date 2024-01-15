import React, { ReactNode, useState, useEffect, useRef, MouseEvent } from "react";
import s from "./Modal.module.scss";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close the modal when clicking outside the content
  const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    // Remove the event listener when the modal closes
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  // Close the modal when the "Escape" key is pressed
  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      onClose();
    }
  };

  return isOpen ? (
    <div
      onClick={handleClickOutside}
      className={s.modal__overlay}
      ref={modalRef}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={s.modal__content}
      >
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
