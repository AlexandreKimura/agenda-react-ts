import { CalendarScreen } from './CalendarScreen';
import {
  BrowserRouter as Router,
  Routes,
  Navigate, 
  Route
} from "react-router-dom";
import { getToday } from './dateFunctions';
import { useEffect, useState } from 'react';
import { getUserEndpoint, IUser } from './backend';
import { LoginScreen } from './LoginScreen';

function App() {

  const month = getToday().substring(0, 7);
  const [user, setUser]= useState<IUser | null>(null)

  useEffect(() => {
    getUserEndpoint().then(() => setUser, () => setUser(null))
  }, [])

  if(user) {
    return (
      <Router>
         <Routes>
            <Route path="/calendar/:month" element={<CalendarScreen />} />
            <Route path="*" element={<Navigate to={{ pathname: "/calendar/" + month}} />} />
          </Routes>
      </Router>
    )
  } else {
    return <LoginScreen onSignIn={(user) => setUser}/>
  }
  
}

export default App;
