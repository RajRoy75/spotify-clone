import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResizableSidebar from './components/shared/ResizableSidebar';
// import './App.css';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import LogedInHome from './pages/LogedInHome';
import UploadSong from './pages/UploadSong';
import Mymusic from './pages/MyMusic';
import songContext from './context/SongContext';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import { getToken } from './utils/serverHelper';

function App() {

  // const [cookie, setCookie] = useCookies(['token']);
  
  const [token, setToken] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const queryClient = new QueryClient();

  useEffect(()=>{
    const fetchToken = async ()=>{
      try {
        const fetchedToken = await getToken();
        setToken(fetchedToken);
      } catch (error) {
        setToken(null);
      }
    }
    fetchToken();
  },[])

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        {token ? (
          <songContext.Provider value={{ currentSong, setCurrentSong }}>
            <Routes>

              <Route path='/' element={<LogedInHome />} />
              <Route path='/upload' element={<UploadSong />} />
              <Route path='/mymusic' element={<Mymusic />} />
              <Route path='*' element={<Navigate to="/" />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
            </Routes>
          </songContext.Provider>
        ) : (
          <Routes>
            <Route path='/' element={<ResizableSidebar />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='*' element={<Navigate to="/login" />} />
          </Routes>
        )}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>


    </div>

  );
}

export default App;
