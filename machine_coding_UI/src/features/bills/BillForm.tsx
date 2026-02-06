import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addBill, editBill } from './billsSlice';

interface BillFormProps {
  existing?: any;
  close: () => void;
}

const BillForm = ({ existing, close }: BillFormProps) => {
  const dispatch = useAppDispatch();
  const friends = useAppSelector(state => state.friends);

  const [description, setDescription] = useState(
    existing?.description || ''
  );

  const [amount, setAmount] = useState(
    existing?.amount ? String(existing.amount) : ''
  );

  const [selectedFriends, setSelectedFriends] = useState<string[]>(
    existing?.friendIds || []
  );

  // Handle multi-select change
  const handleFriendsChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const values = Array.from(
      e.target.selectedOptions,
      option => option.value
    );
    setSelectedFriends(values);
  };

  const handleSave = () => {
    if (!description || !amount || selectedFriends.length === 0) return;

    const totalAmount = Number(amount);

    const bill = {
      id: existing?.id || Date.now().toString(),
      description,
      amount: totalAmount,
      friendIds: selectedFriends,
      splitAmount: Number(
        (totalAmount / selectedFriends.length).toFixed(2)
      ),
    };

    if (existing?.id) {
      dispatch(editBill(bill));
    } else {
      dispatch(addBill(bill));
    }

    close();
  };

  return (
    <div className="bill-form">
      {/* Description */}
      <div className="form-group">
        <label>Expense Description</label>
        <input
          type="text"
          placeholder="Expense description..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      {/* Amount (NO SPINNER) */}
      <div className="form-group">
        <label>Total Amount</label>
        <div className="amount-input">
          <span>₹</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
      </div>

     {/* Friends */}
     <div className="form-group">
        <label>Friends</label>
        <div className="friends-checkbox-grid">
          {friends.map(f => (
            <label key={f.id} className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedFriends.includes(f.id)}
                onChange={() => toggleFriend(f.id)}
              />
              {f.name}
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="modal-actions">
        <button className="secondary-btn" onClick={close}>
          Cancel
        </button>
        <button className="primary-btn" onClick={handleSave}>
          {existing?.id ? 'Update Bill' : 'Save Bill'}
        </button>
      </div>
    </div>
  );
};

export default BillForm;
