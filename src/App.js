import UserState from './context/user/UserState';
import WhiskState from './context/whisk/WhiskState';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Navigation from './components/Navigation';
import ChosenWhisks from './assets/layouts/ChosenWhisks';
import UserProfile from './assets/layouts/UserProfile';

function App() {
  return (
    <UserState>
      <WhiskState>
        <Router>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/user'>
            {/* User Profile */}
            <UserProfile />
          </Route>
          <Route path='/user/whisks'>
            {/* User's Chosen Whisks */}
            <ChosenWhisks />
          </Route>
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
