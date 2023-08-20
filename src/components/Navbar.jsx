import React, {useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar() {
   const {auth} = useContext(Context);
   const [user] = useAuthState(auth);

   return (
      <AppBar color='secondary' position="static">
         <Toolbar variant="dense">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Chat</Typography>
            { user ?
            <Button onClick={() => auth.signOut()} style={{textDecoration: "none", color: "#fff"}} variant='outlined' color="inherit">Logout</Button>
            :
            <NavLink style={{textDecoration: "none", color: "#fff"}} to={LOGIN_ROUTE}><Button variant='outlined' color="inherit">Login</Button></NavLink>
            }
         </Toolbar>
      </AppBar>
   );
}

export default Navbar;