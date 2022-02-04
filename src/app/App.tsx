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
import { userContext } from './authContext';

function App() {

  const month = getToday().substring(0, 7);
  const [user, setUser]= useState<IUser | null>(null)

  useEffect(() => {
    getUserEndpoint().then(() => setUser, () => setUser(null))
  }, [])

  function onSignOut() {
    setUser(null)
  }

  if(user) {
    return (
      <userContext.Provider value={user}>
        <Router>
          <Routes>
              <Route path="/calendar/:month" element={<CalendarScreen onSignOut={onSignOut} />} />
              <Route path="*" element={<Navigate to={{ pathname: "/calendar/" + month}} />} />
            </Routes>
        </Router>
      </userContext.Provider>
    )
  } else {
    return <LoginScreen onSignIn={(user) => setUser(user)}/>
  }
  
}

export default App;
