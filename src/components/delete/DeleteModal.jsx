import ReactDom from 'react-dom';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/delete.json';
import styles from './DeleteModal.module.css';

export const DeleteModal = ({ open, name, onCancel, onDelete }) => {
  if (!open) return null;
  return ReactDom.createPortal(
    <div className="modal-container">
      <div className="modal">
        <div className="animation">
          <Lottie animationData={animation} loop={true} />
        </div>
        <h1>Are you sure?</h1>
        <p>
          Do you really want to delete <span className="item_name">{name}</span> ? This process
          cannot be undone.
        </p>
        <div className="btn-wrapper">
          <button className="cancel_btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="delete_btn" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
