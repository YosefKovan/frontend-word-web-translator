import type { User } from '../../../types/user';
import './DeleteConfirmModal.css';

interface DeleteConfirmModalProps {
  user: User;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({ user, onClose, onConfirm }: DeleteConfirmModalProps) {
  return (
    <div className="delete-overlay" onClick={onClose}>
      <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal__icon-wrap">
          <span className="material-symbols-outlined delete-modal__icon">delete_forever</span>
        </div>
        <h2 className="delete-modal__title">Delete User</h2>
        <p className="delete-modal__body">
          Are you sure you want to delete <strong>{user.name}</strong>?
          <br />
          This action cannot be undone.
        </p>
        <div className="delete-modal__footer">
          <button className="delete-modal__btn delete-modal__btn--cancel" onClick={onClose}>Cancel</button>
          <button className="delete-modal__btn delete-modal__btn--confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
