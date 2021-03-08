import UserState from './context/user/UserState';
import WhiskState from './context/whisk/WhiskState';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChosenWhisks from './layouts/ChosenWhisks';
import UserProfile from './layouts/UserProfile';
import Welcome from './layouts/Welcome';
import Navigation from './components/Navigation';
import { withAuthenticator } from "@aws-amplify/ui-react"

function App() {
  return (
    <UserState>
      <WhiskState>
        <Router>
          <Navigation/>
          <Switch>
            <Route path='/user'>
              {/* User Profile */}
              <UserProfile />
            </Route>
            <Route path='/user/whisks'>
              {/* User's Chosen Whisks */}
              <ChosenWhisks />
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

export default withAuthenticator(App);
