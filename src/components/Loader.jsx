import { Container, Grid } from '@material-ui/core';
import React from 'react';

export default function Loader() {
   return (
      <Container>
         <Grid container style={{height: window.innerHeight - 50, justifyContent: "center", alignItems: "center"}}>
            <Grid container alignItems={"center"} direction={"column"}>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </Grid>
         </Grid>
      </Container>
   );
}