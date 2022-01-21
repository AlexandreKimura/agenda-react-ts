import { CalendarScreen } from './CalendarScreen';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { getToday } from './dateFunctions';

function App() {

  const month = getToday().getDate()

  return (
    <Router>
      <Routes >
        <Route path="/calendar/:month">
          <CalendarScreen />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
