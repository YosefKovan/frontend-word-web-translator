import { useState } from 'react';
import type { User, UserRole } from '../../../types/user';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';
import StatusConfirmModal from '../StatusConfirmModal/StatusConfirmModal';
import UserProgressModal from '../UserProgressModal/UserProgressModal';
import './UsersTable.css';
import {useAdmin} from "../../../hooks/useAdmin";


interface UsersTableProps {
  users: User[];
  onDeleteUser?: (userId: string) => void;
  onUpdateUser?: (userId: string, role: UserRole, isActive: boolean) => void;
}


export default function UsersTable({ users }: UsersTableProps) {
  
  const {deleteUser, updateUser} = useAdmin();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToToggleStatus, setUserToToggleStatus] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<User | null>(null);

  function handleConfirmDelete() {
    if (userToDelete) {
      deleteUser(userToDelete.user_id);
      setUserToDelete(null);
    }
  }

  function handleSaveRole(userId: string, role: UserRole) {
    updateUser({ action_type: 'change_role', target_user_id: userId, new_role: role });
  }

  function handleConfirmToggleStatus() {
    if (userToToggleStatus) {
      const action_type = userToToggleStatus.status === 'active' ? 'deactivate' : 'activate';
      updateUser({ action_type, target_user_id: userToToggleStatus.user_id });
      setUserToToggleStatus(null);
    }
  }

  return (
    <>
      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Words Count</th>
              <th>Progress Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={8} className="users-table__empty">
                  <span className="material-symbols-outlined">group</span>
                  <p>No users found</p>
                </td>
              </tr>
            ) : (
              users.map((user) => {
                return (
                  <tr key={user.user_id} className="users-table__row--clickable" onClick={() => setUserProgress(user)}>
                    <td className="users-table__username" data-label="Username">
                      <span className="users-table__name">{user.name}</span>
                    </td>
                    <td className="users-table__email-cell" data-label="Email">
                      {user.email ?? '—'}
                    </td>
                    <td data-label="Role">
                      <span className={`users-table__role users-table__role--${user.role ?? 'user'}`}>
                        {user.role === 'admin' ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td data-label="Status">
                      <span className={`users-table__status users-table__status--${user.status === 'active' ? 'active' : 'inactive'}`}>
                        <span className="users-table__status-dot" />
                        {user.status === 'active' ? 'Active' : 'Not Active'}
                      </span>
                    </td>
                    <td className="users-table__date" data-label="Last Active">
                      {new Date(user.last_active).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="users-table__number" data-label="Words Count">{user.words_count.toLocaleString()}</td>
                    <td className="users-table__number" data-label="Progress Score">{user.progress_score}</td>
                    <td className="users-table__actions" data-label="Actions" onClick={(e) => e.stopPropagation()}>
                      <div className="users-table__actions-group">
                        <button
                          className="users-table__action-btn users-table__action-btn--role"
                          onClick={() => setSelectedUser(user)}
                          aria-label="Change role"
                          data-tooltip="Change Role"
                        >
                          <span className="material-symbols-outlined">manage_accounts</span>
                        </button>
                        <button
                          className={`users-table__action-btn users-table__action-btn--status${user.status === 'active' ? ' users-table__action-btn--status-active' : ''}`}
                          onClick={() => setUserToToggleStatus(user)}
                          aria-label="Toggle status"
                          data-tooltip={user.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          <span className="material-symbols-outlined">
                            {user.status === 'active' ? 'toggle_on' : 'toggle_off'}
                          </span>
                        </button>
                        <button
                          className="users-table__action-btn users-table__action-btn--delete"
                          onClick={() => setUserToDelete(user)}
                          aria-label="Delete user"
                          data-tooltip="Delete"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <UserSettingsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleSaveRole}
        />
      )}

      {userToDelete && (
        <DeleteConfirmModal
          user={userToDelete}
          onClose={() => setUserToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {userToToggleStatus && (
        <StatusConfirmModal
          user={userToToggleStatus}
          onClose={() => setUserToToggleStatus(null)}
          onConfirm={handleConfirmToggleStatus}
        />
      )}

      {userProgress && (
        <UserProgressModal
          user={userProgress}
          onClose={() => setUserProgress(null)}
        />
      )}
    </>
  );
}
