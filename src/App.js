import UserState from './context/user/UserState';
import WhiskState from './context/whisk/WhiskState';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserProfile from './layouts/UserProfile';
import Welcome from './layouts/Welcome';
import Navigation from './components/Navigation';
import { BrowserView } from 'react-device-detect';
import WhiskDetails from './layouts/WhiskDetails';
import SearchResults from './layouts/SearchResults';
import Login from './components/Login';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import ProtectedRoute from './components/ProtectedRoute';
import UserWhisks from './layouts/UserWhisks';
import { Match } from './layouts/Match';

Amplify.configure(config);

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
            <Route path='/user/whisks'>
              <UserWhisks />
            </Route>
            <Route path='/user/match/:id'>
              <Match />
            </Route>
            <ProtectedRoute path='/user'>
              <UserProfile questionnaire={<div>Q modal</div>}/>
            </ProtectedRoute>
            <Route path='/whisks/search'>
              <SearchResults />
            </Route>
            <Route path='/whisks/:id'>
              <WhiskDetails />
            </Route>
            <Route exact path='/'>
              <Welcome />
            </Route>
          </Switch>
        </Router>
      </WhiskState>
    </UserState>
  );
}

export default App;
