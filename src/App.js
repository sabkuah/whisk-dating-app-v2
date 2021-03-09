import UserState from './context/user/UserState';
import WhiskState from './context/whisk/WhiskState';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import ChosenWhisks from './layouts/ChosenWhisks';
import UserProfile from './layouts/UserProfile';
import Welcome from './layouts/Welcome';
import Navigation from './components/Navigation';
import { BrowserView } from 'react-device-detect';
import WhiskDetails from './layouts/WhiskDetails';

function App() {
  return (
    <UserState>
      <WhiskState>
        <Router>
          <BrowserView>
            <Navigation />
          </BrowserView>
          <Switch>
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
            <Route path='/whisks/id'>
              <WhiskDetails />
            </Route>
            <Route exact path='/'>
              {/* Landing: Experiences for you */}
              <Welcome />
            </Route>
          </Switch>
        </Router>
      </WhiskState>
    </UserState>
  );
}

export default App;
