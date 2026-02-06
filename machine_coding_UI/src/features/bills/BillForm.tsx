import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addBill, editBill } from './billsSlice';

const BillForm = ({ existing, close }: any) => {
  const friends = useAppSelector(s => s.friends);
  const dispatch = useAppDispatch();

  const [desc, setDesc] = useState(existing?.description || '');
  const [amount, setAmount] = useState(existing?.amount || 0);
  const [ids, setIds] = useState<string[]>(existing?.friendIds || []);

  const toggle = (id: string) =>
    setIds(p => (p.includes(id) ? p.filter(x => x !== id) : [...p, id]));

  const split = Number((amount / ids.length).toFixed(2));

  const save = () => {
    const bill = {
      id: existing?.id || Date.now().toString(),
      description: desc,
      amount,
      friendIds: ids,
      splitAmount: split,
    };

    existing?.id ? dispatch(editBill(bill)) : dispatch(addBill(bill));
    close();
  };

  return (
    <>
      <input value={desc} onChange={e => setDesc(e.target.value)} />
      <input type="number" value={amount} onChange={e => setAmount(+e.target.value)} />

      {friends.map(f => (
        <label key={f.id}>
          <input
            type="checkbox"
            checked={ids.includes(f.id)}
            onChange={() => toggle(f.id)}
          />
          {f.name}
        </label>
      ))}

      <button onClick={save}>Save</button>
    </>
  );
};

export default BillForm;
