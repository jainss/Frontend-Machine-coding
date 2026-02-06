import './components.css';

const Sidebar = ({ page, setPage }: any) => {
  return (
    <aside className="sidebar">
      <h2 className="logo">Split Manager</h2>

      <button
        className={page === 'friends' ? 'active' : ''}
        onClick={() => setPage('friends')}
      >
        Friends
      </button>

      <button
        className={page === 'bills' ? 'active' : ''}
        onClick={() => setPage('bills')}
      >
        Bills
      </button>
    </aside>
  );
};

export default Sidebar;
