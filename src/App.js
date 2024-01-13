import { useContext } from "react";
// styles
import "./App.scss";
// react-router-dom
import { HashRouter } from "react-router-dom";
// components
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRouter";
import Loader from "./components/Loader";
// react-firebase-hooks
import { useAuthState } from "react-firebase-hooks/auth";
// context
import { Context } from "./index";

function App() {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <HashRouter>
      <Navbar />
      <AppRouter />
    </HashRouter>
  );
}

export default App;
