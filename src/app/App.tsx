import { CalendarScreen } from './CalendarScreen';
import {
  BrowserRouter as Router,
  Routes,
  Navigate, 
  Route
} from "react-router-dom";
import { getToday } from './dateFunctions';
import { useEffect, useState } from 'react';
import { getUserEndpoint } from './backend';
import { LoginScreen } from './LoginScreen';

function App() {

  const month = getToday().substring(0, 7);
  const [hasSession, setHasSession]= useState(false)

  useEffect(() => {
    getUserEndpoint().then(() => setHasSession(true), () => setHasSession(false))
  }, [])

  if(hasSession) {
    return (
      <Router>
         <Routes>
            <Route path="/calendar/:month" element={<CalendarScreen />} />
            <Route path="*" element={<Navigate to={{ pathname: "/calendar/" + month}} />} />
          </Routes>
      </Router>
    )
  } else {
    return <LoginScreen />
  }
  
}

export default App;
