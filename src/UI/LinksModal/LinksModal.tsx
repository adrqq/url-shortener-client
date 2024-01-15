import React, { FC, useRef, useEffect } from 'react';
import s from './LinksModal.module.scss';
import { ModalLinksData } from '../../types/ModalLinksData';
import { NavLink } from 'react-router-dom';

interface LinksModalProps {
  linksData: ModalLinksData[];
  width?: string;
  outerPadding?: string;
  linkGap?: string;
  closeModal?: () => void;
  ignoreButtonRef: React.RefObject<HTMLButtonElement>;
}

export const LinksModal: FC<LinksModalProps> = ({
  linksData,
  width = '100%',
  outerPadding = '10px',
  linkGap = '10px',
  closeModal,
  ignoreButtonRef,
}) => {
  const modalRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleModalClose = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal && closeModal();
      }
    };

    document.addEventListener('mousedown', (e) => {
      if (
        ignoreButtonRef.current &&
        ignoreButtonRef.current.contains(e.target as Node)
      ) {
        // Clicked inside the ignore button, do nothing.
        return;
      }

      handleModalClose(e);
    });

    return () => {
      document.removeEventListener('mousedown', handleModalClose);
    };
  }, [closeModal, ignoreButtonRef]);

  return (
    <div className={s.modalOverlay}>
      <ul
        ref={modalRef}
        className={s.links_modal}
        style={{
          width,
          padding: outerPadding,
          gap: linkGap,
        }}
      >
        {linksData.map((link) => (
          <li
            key={link.text}
            className={s.links_modal__item}
          >
            {(link.to && !link.onClick) ? (
              <NavLink
                className={s.links_modal__link}
                to={link.to}
                onClick={closeModal}
              >
                {link.text}

                {link.icon && (
                  <img className={s.links_modal__icon} src={link.icon} alt="icon" />
                )}
              </NavLink>
            ) : (
              <button
                type='button'
                className={s.links_modal__link}
                onClick={link.onClick}
              >
                {link.text}

                {link.icon && (
                  <img className={s.links_modal__icon} src={link.icon} alt="icon" />
                )}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinksModal;