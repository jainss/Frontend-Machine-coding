import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addFriend, editFriend } from './friendsSlice';

const FriendForm = ({ existing, close }: any) => {
  const [name, setName] = useState(existing?.name || '');
  const dispatch = useAppDispatch();

  const save = () => {
    if (existing?.id) {
      dispatch(editFriend({ id: existing.id, name }));
    } else {
      dispatch(addFriend({ id: Date.now().toString(), name }));
    }
    close();
  };

  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={save}>Save</button>
    </>
  );
};

export default FriendForm;
