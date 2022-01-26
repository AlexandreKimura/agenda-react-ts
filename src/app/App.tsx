import { CalendarScreen } from './CalendarScreen';
import {
  BrowserRouter as Router,
  Routes,
  Navigate, 
  Route
} from "react-router-dom";
import { getToday } from './dateFunctions';

function App() {

  const month = getToday().substring(0, 7);

  return (
    <Router>
       <Routes>
          <Route path="/calendar/:month" element={<CalendarScreen />} />
          <Route path="*" element={<Navigate to={{ pathname: "/calendar/" + month}} />} />
        </Routes>
    </Router>
  )
}

export default App;
