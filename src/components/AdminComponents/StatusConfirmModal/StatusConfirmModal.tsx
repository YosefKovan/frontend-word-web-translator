import type { User } from '../../../types/user';
import './StatusConfirmModal.css';

interface StatusConfirmModalProps {
  user: User;
  onClose: () => void;
  onConfirm: () => void;
}

export default function StatusConfirmModal({ user, onClose, onConfirm }: StatusConfirmModalProps) {
  const isActivating = user.status !== 'active';
  const actionLabel = isActivating ? 'Activate' : 'Deactivate';
  const iconName = isActivating ? 'toggle_on' : 'toggle_off';

  return (
    <div className="status-overlay" onClick={onClose}>
      <div className="status-modal" onClick={(e) => e.stopPropagation()}>
        <div className={`status-modal__icon-wrap${isActivating ? ' status-modal__icon-wrap--activate' : ' status-modal__icon-wrap--deactivate'}`}>
          <span className="material-symbols-outlined status-modal__icon">{iconName}</span>
        </div>
        <h2 className="status-modal__title">{actionLabel} User</h2>
        <p className="status-modal__body">
          Are you sure you want to {actionLabel.toLowerCase()} <strong>{user.name}</strong>?
          <br />
          {isActivating
            ? 'The user will be able to access the platform.'
            : 'The user will lose access to the platform.'}
        </p>
        <div className="status-modal__footer">
          <button className="status-modal__btn status-modal__btn--cancel" onClick={onClose}>Cancel</button>
          <button
            className={`status-modal__btn${isActivating ? ' status-modal__btn--activate' : ' status-modal__btn--deactivate'}`}
            onClick={onConfirm}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
