//чтобы модальное окно не заходило под шапку
// import { createPortal } from 'react-dom';
import { createPortal } from 'react-dom';
import { TModalPortalProps } from './type';

export const ModalPortal = ({ children }: TModalPortalProps) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(children, modalRoot);
};
