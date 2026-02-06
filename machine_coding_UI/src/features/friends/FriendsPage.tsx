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
  const [search, setSearch] = useState('');

  // ✅ SEARCH FILTER
  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="friends-page">
      {/* Header */}
      <div className="friends-header">
        <h1>Friends</h1>
        <button className="primary-btn" onClick={() => setEditing({})}>
          + Add New Friend
        </button>
      </div>

      {/* Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search friends..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Cards */}
      <div className="friends-grid">
        {filteredFriends.map(f => (
          <div key={f.id} className="friend-card">
            <div className="left">
              <div className="avatar">{f.name[0].toUpperCase()}</div>
              <div>
                <div className="name">{f.name}</div>
                <div className="sub">Friend</div>
              </div>
            </div>

            <div className="actions">
              <button onClick={() => setEditing(f)}>✏️</button>
              <button onClick={() => dispatch(deleteFriend(f.id))}>🗑</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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
