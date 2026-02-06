import './components.css';

const Modal = ({ isOpen, title, onClose, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header>
          <h3>{title}</h3>
          <button onClick={onClose}>✕</button>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Modal;
