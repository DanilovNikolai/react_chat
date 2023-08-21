import './App.css';
import { BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from './index';
import { useContext } from 'react';
import Loader from './components/Loader';

function App() {
  const {auth} = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader/>
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
    );
}

export default App;
