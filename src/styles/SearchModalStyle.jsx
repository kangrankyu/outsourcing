import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    position: relative;
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    height: 450px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 0px;
    right: 0px;
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: black;
`;