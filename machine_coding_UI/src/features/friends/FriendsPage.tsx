import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteFriend } from './friendsSlice';
import Modal from '../../components/Modal';
import FriendForm from './FriendForm';
import './friends.css';

const FriendsPage = () => {
  const friends = useAppSelector(s => s.friends);
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState<any>(null);

  return (
    <div className="friends-page">
      {/* Header */}
      <div className="friends-header">
        <h1>Friends</h1>
        <button className="primary-pill" onClick={() => setEditing({})}>
          + Add New Friend
        </button>
      </div>

      {/* Search */}
      <input className="search" placeholder="Search friends..." />

      {/* Cards */}
      <div className="friends-grid">
        {friends.map(f => (
          <div key={f.id} className="friend-card">
            <div className="friend-left">
              <div className="avatar">{f.name[0]}</div>
              <div>
                <strong>{f.name}</strong>
                <p>Friend</p>
              </div>
            </div>

            <div className="actions">
              <button onClick={() => setEditing(f)}>✏️</button>
              <button onClick={() => dispatch(deleteFriend(f.id))}>🗑</button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!editing}
        title={editing?.id ? 'Edit Friend' : 'Add Friend'}
        onClose={() => setEditing(null)}
      >
        <FriendForm existing={editing} close={() => setEditing(null)} />
      </Modal>
    </div>
  );
};

export default FriendsPage;
