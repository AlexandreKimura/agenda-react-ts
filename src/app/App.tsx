import { CalendarScreen } from './CalendarScreen';
import {
  BrowserRouter as Router,
  Routes,
  Navigate, 
  Route
} from "react-router-dom";
import { getToday } from './dateFunctions';
import { Component, ReactNode, useEffect, useState } from 'react';
import { getUserEndpoint, IUser } from './backend';
import { LoginScreen } from './LoginScreen';
import { authContext } from './authContext';

//Moderno
function App2() {

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
      <authContext.Provider value={{ user, onSignOut }}>
          <Router>
            <Routes>
                <Route path="/calendar/:month" element={<CalendarScreen />} />
                <Route path="*" element={<Navigate to={{ pathname: "/calendar/" + month}} />} />
              </Routes>
          </Router>
      </authContext.Provider>
    )
  } else {
    return <LoginScreen onSignIn={(user) => setUser(user)}/>
  }
  
}

//Class components
class App extends Component<{}, {user: IUser | null}> {

  setUser: (user: IUser) => void
  onSignOut: () => void

  constructor(props: {}) {
    super(props)
    this.state = {
      user: null
    }

    this.setUser = (user: IUser) => {
      this.setState({ user })
    }

    this.onSignOut = () => {
      this.setState({ user: null })
    }
  }

  render(): ReactNode {
    const month = getToday().substring(0, 7);

    const { user } = this.state

    if(user) {
      return (
        <authContext.Provider value={{ user, onSignOut: this.onSignOut }}>
            <Router>
              <Routes>
                  <Route path="/calendar/:month" element={<CalendarScreen />} />
                  <Route path="*" element={<Navigate to={{ pathname: "/calendar/" + month}} />} />
                </Routes>
            </Router>
        </authContext.Provider>
      )
    } else {
      return <LoginScreen onSignIn={(user) => this.setUser(user)}/>
    }   
  }

  componentDidMount() {
    getUserEndpoint().then(() => this.setUser, this.onSignOut)
  }
}

export default App;
