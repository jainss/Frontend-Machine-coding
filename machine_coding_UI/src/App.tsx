import { useEffect, useState } from 'react';
import { fetchInitialData } from './services/api';
import { useAppDispatch } from './app/hooks';
import { setFriends } from './features/friends/friendsSlice';
import { setBills } from './features/bills/billsSlice';
import FriendsPage from './features/friends/FriendsPage';
import BillsPage from './features/bills/BillsPage';
import Sidebar from './components/Sidebar';

function App() {
  const [pages, setPages] = useState<'friends' | 'bills'>('friends');
  const dispatchers = useAppDispatch();

  useEffect(() => {
    fetchInitialData().then(data => {
      dispatchers(setFriends(data.friends || []));
      dispatchers(setBills(data.bills || []));
    });
  }, []);

  return (
    <div className="app-layout">
      <Sidebar pages={pages} setPages={setPages} />
      <main className="content">
        {pages === 'friends' ? <FriendsPage /> : <BillsPage />}
      </main>
    </div>
  );
}

export default App
