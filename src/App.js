import UserState from './context/user/UserState';
import WhiskState from './context/whisk/WhiskState';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Navigation from './components/Navigation';

function App() {
  return (
    <UserState>
      <WhiskState>
        <Router>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/user'>{/* User Profile */}</Route>
          <Route path='/user/whisks'>{/* User's Chosen Whisks */}</Route>
          <Route path='/'>
            {/* Landing: Experiences for you */}
            <Navigation />
          </Route>
        </Router>
      </WhiskState>
    </UserState>
  );
}

export default App;
