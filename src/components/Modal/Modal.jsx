import './Modal.css';
import { useEffect, useRef } from 'react';

const Modal = ({ icon, title, desc, textBtnOk, textBtnCancel, showModal, clickHandlerOk }) => {
  const modal = useRef(null);
  useEffect(() => {
    window.setTimeout(() => {
      modal.current.classList.add('show-modal');
    }, 50);
  }, [showModal]);

  const clickHandlerBtns = (e) => {
    const { target } = e;
    if (target.classList.contains('modal')) {
      return;
    }

    modal.current.classList.remove('show-modal');
    window.setTimeout(() => {
      showModal(false);
    }, 200);
  };

  return (
    <div className='container-modal' onClick={clickHandlerBtns}>
      <div className='modal' ref={modal}>
        <div className='icons'>{icon}</div>
        <div className='title'>{title}</div>
        <div className='desc'>{desc}</div>
        <div className='btns'>
          {!textBtnOk ? null : (
            <button type='button' onClick={clickHandlerOk}>
              {textBtnOk}
            </button>
          )}

          {!textBtnCancel ? null : <button type='button'>{textBtnCancel}</button>}
        </div>
      </div>
    </div>
  );
};
export default Modal;
