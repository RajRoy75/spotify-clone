import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Navigate } from 'react-router-dom';
import LogedInHome from './pages/LogedInHome';
import UploadSong from './pages/UploadSong';
import Mymusic from './pages/MyMusic';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import { getToken } from './utils/serverHelper';
import { PlayerProvider } from './hooks/playerProvider';
import CreatePlaylist from './pages/CreatePlaylist';

function App() {

  const [token, setToken] = useState(null);
  const queryClient = new QueryClient();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const fetchedToken = await getToken();
        setToken(fetchedToken);
      } catch (error) {
        setToken(null);
      }
    }
    fetchToken();
  }, [])

  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <PlayerProvider>
          <Routes>
            <Route path='/' element={<LogedInHome />} />
            <Route path='/upload' element={<UploadSong />} />
            <Route path='/mymusic' element={<Mymusic />} />
            <Route path='/create-playlist' element={<CreatePlaylist />} />
            <Route path='*' element={<Navigate to="/" />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </PlayerProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
