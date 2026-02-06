import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addFriend, editFriend } from './friendsSlice';
import './friends.css';

const FriendForm = ({ existing, close }: any) => {
  const [name, setName] = useState(existing?.name || '');
  const dispatch = useAppDispatch();

  const handleSave = () => {
    if (!name.trim()) return;

    if (existing?.id) {
      dispatch(editFriend({ id: existing.id, name }));
    } else {
      dispatch(addFriend({ id: Date.now().toString(), name }));
    }
    close();
  };

  return (
    <>
      <input
        className="friend-input"
        placeholder="Friend name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <div className="modal-actions">
        <button className="primary-btn" onClick={handleSave}>
          {existing?.id ? 'Update Friend' : 'Add Friend'}
        </button>
        <button className="secondary-btn" onClick={close}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default FriendForm;
