import { CloseButton, ModalContent, ModalOverlay } from "../styles/SearchModalStyle";

const Modal = ({ children, onClose }) => {
    return (
        <ModalOverlay>
            <ModalContent>
                <CloseButton type="button" onClick={onClose}>X</CloseButton>
                    {children}
            </ModalContent>
        </ModalOverlay>
    );
};

export default Modal;