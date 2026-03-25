import { useState } from 'react';
import type { User, UserRole } from '../../../types/user';
import './UserSettingsModal.css';


interface UserSettingsModalProps {
  user: User;
  onClose: () => void;
  onSave: (userId: string, role: UserRole) => void;
}

const ROLES: { label: string; value: UserRole }[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'user' },
];

export default function UserSettingsModal({ user, onClose, onSave}: UserSettingsModalProps) {
  const [role, setRole] = useState<UserRole>(user.role ?? 'user');

  function handleSave() {
    onSave(user.user_id, role);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Change Role</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="modal__body">
          <p className="modal__section-label">ROLE</p>
          <div className="modal__role-group">
            {ROLES.map(({ label, value }) => (
              <button
                key={value}
                className={`modal__role-btn${role === value ? ' modal__role-btn--active' : ''}`}
                onClick={() => setRole(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="modal__footer">
          <button className="modal__btn modal__btn--cancel" onClick={onClose}>Cancel</button>
          <button className="modal__btn modal__btn--save" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
