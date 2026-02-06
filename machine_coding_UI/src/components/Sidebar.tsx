import './components.css';

const Sidebar = ({ pages, setPages }: any) => {
  return (
    <aside className="sidebar">
      <h2 className="logo">Split Manager</h2>

      <button
        className={pages === 'friends' ? 'active' : ''}
        onClick={() => setPages('friends')}
      >
        Friends
      </button>

      <button
        className={pages === 'bills' ? 'active' : ''}
        onClick={() => setPages('bills')}
      >
        Bills
      </button>
    </aside>
  );
};

export default Sidebar;
