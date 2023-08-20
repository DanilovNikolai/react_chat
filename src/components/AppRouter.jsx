import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routes';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from '../index';

function AppRouter() {
   const {auth} = useContext(Context);
   const [user] = useAuthState(auth);

   return user ?
      (
         <Routes>
            { privateRoutes.map(({path, Element}) =>
               <Route key={path} path={path} element={Element}/>
            )}
            <Route path='*' element={<Navigate to={CHAT_ROUTE}/>}/>
         </Routes>
      )
      :
      (
         <Routes>
            { publicRoutes.map(({path, Element}) =>
               <Route key={path} path={path} element={Element}/>
            )}
            <Route path='*' element={<Navigate to={LOGIN_ROUTE}/>}/>
         </Routes>
      )
}

export default AppRouter;