import React, { useContext } from 'react';
import { Box, Button, Container, Grid } from '@material-ui/core';
import { Context } from '../index';
import firebase from "firebase/compat/app";

function Login() {
   const { auth } = useContext(Context);

   const login = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      const {user} = await auth.signInWithPopup(provider);
   }

   return (
      <Container>
         <Grid container style={{height: window.innerHeight - 50, justifyContent: "center", alignItems: "center"}}>
            <Grid style={{width: "50%", background: "#fff"}} container alignItems={"center"} direction={"column"}>
               <Box p={5}>
                  <Button onClick={login} variant='outlined' style={{color: "rgb(152, 61, 152)"}}>Login with Google</Button>
               </Box>
            </Grid>
         </Grid>
      </Container>
   );
}

export default Login;