import { useEffect, useState } from 'react';
import { fetchInitialData } from './services/api';
import { useAppDispatch } from './app/hooks';
import { setFriends } from './features/friends/friendsSlice';
import { setBills } from './features/bills/billsSlice';
import FriendsPage from './features/friends/FriendsPage';
import BillsPage from './features/bills/BillsPage';
import Sidebar from './components/Sidebar';

function App() {
  const [page, setPage] = useState<'friends' | 'bills'>('friends');
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchInitialData().then(data => {
      dispatch(setFriends(data.friends || []));
      dispatch(setBills(data.bills || []));
    });
  }, []);

  return (
    <div className="app-layout">
      <Sidebar page={page} setPage={setPage} />
      <main className="content">
        {page === 'friends' ? <FriendsPage /> : <BillsPage />}
      </main>
    </div>
  );
}

export default App
