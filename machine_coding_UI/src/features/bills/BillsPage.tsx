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
  const [editing, setEditing] = useState<any>(null);

  const getNames = (ids: string[]) =>
    friends.filter(f => ids.includes(f.id)).map(f => f.name).join(', ');

  return (
    <div className="bills-page">
  <div className="bills-header">
    <h1>All Bills</h1>
    <button className="primary-btn">+ Add New Bill</button>
  </div>

  <div className="search-bar">
    <input placeholder="Filter/Search bills..." />
  </div>

  <div className="bill-table">
    <div className="bill-head">
      <span>Description</span>
      <span>Total Amount</span>
      <span>Friends</span>
      <span>Actions</span>
    </div>

    {bills.map(b => (
      <div key={b.id} className="bill-row">
        <span>{b.description}</span>
        <span>₹{b.amount}</span>
        <span>{getNames(b.friendIds)}</span>
        <button onClick={() => dispatch(deleteBill(b.id))}>🗑</button>
      </div>
    ))}
  </div>
</div>

  );
};

export default BillsPage;
