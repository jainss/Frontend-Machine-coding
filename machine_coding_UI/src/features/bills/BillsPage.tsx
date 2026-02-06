import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteBill } from './billsSlice';
import Modal from '../../components/Modal';
import BillForm from './BillForm';
import './bills.css';

const BillsPage = () => {
  const bills = useAppSelector(s => s.bills);
  const friends = useAppSelector(s => s.friends);
  const dispatch = useAppDispatch();

  const [editingBill, setEditingBill] = useState<any>(null);
  const [search, setSearch] = useState('');

  const getNames = (ids: string[]) =>
    friends.filter(f => ids.includes(f.id)).map(f => f.name).join(', ');

  const filteredBills = bills.filter(b =>
    b.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bills-page">
      <div className="bills-header">
        <h1>All Bills</h1>
        <button className="primary-btn" onClick={() => setEditingBill({})}>
          + Add New Bill
        </button>
      </div>

      <div className="search-bar">
        <input
          placeholder="Filter/Search bills..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="bill-table">
        <div className="bill-head">
          <span>Description</span>
          <span>Total Amount</span>
          <span>Friends</span>
          <span>Actions</span>
        </div>

        {filteredBills.map(b => (
          <div key={b.id} className="bill-row">
            <span>{b.description}</span>
            <span>₹{b.amount}</span>
            <span>{getNames(b.friendIds)}</span>

            <div className="actions">
              <button onClick={() => setEditingBill(b)}>✏️</button>
              <button onClick={() => dispatch(deleteBill(b.id))}>🗑</button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!editingBill}
        title={editingBill?.id ? 'Edit Bill' : 'Add New Bill'}
        onClose={() => setEditingBill(null)}
      >
        <BillForm
          existing={editingBill}
          close={() => setEditingBill(null)}
        />
      </Modal>
    </div>
  );
};

export default BillsPage;
