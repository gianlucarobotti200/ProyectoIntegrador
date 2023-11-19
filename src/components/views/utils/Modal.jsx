import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.div`

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;

  .modal-content {
    max-width: 80%;
    max-height: 80%;
    overflow: hidden;
  }

  .modal-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Modal = ({ image, onClose }) => {
  return (
    <StyledModal onClick={onClose}>
      <div className='modal-content'>
        <img className='modal-image' src={image} alt='Modal' />
      </div>
    </StyledModal>
  );
};

export default Modal;
