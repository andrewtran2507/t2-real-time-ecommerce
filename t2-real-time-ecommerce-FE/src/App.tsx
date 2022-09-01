import React, { useState, useEffect } from "react";

import MainLayout from "layouts/MainLayout";
import MainRoutes from "router/MainRoutes";
import io from 'socket.io-client';
import { useDispatch } from "react-redux";
import { AppDispatch } from "state/store";
import { setNotificationAlert } from "slice/user"

import 'ag-grid-enterprise';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

let isLoadSK = false;

function App() {
  const [socket, setSocket] = useState({close: () => {}, on: null});
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!isLoadSK) {
      isLoadSK = true;
      const newSocket: any = io(`${process.env.REACT_APP_API_URL}/alert`);
      setSocket(newSocket);
      newSocket.on('connect', function() {
        console.log('Connected');
      });
      
      newSocket.on('alertAddAnOrderToClient', (data: any) => {
        dispatch(setNotificationAlert(data))
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected');
      });
    }
    return () => socket.close();
  }, []);

  return (
    <React.StrictMode>
      <MainLayout>
        <MainRoutes />
      </MainLayout>
    </React.StrictMode>
  );
}

export default App;