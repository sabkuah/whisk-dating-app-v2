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
            <ProtectedRoute path='/user/whisks'>
              <UserWhisks />
            </ProtectedRoute>
            <ProtectedRoute path='/user/match/:id'>
              <Match />
            </ProtectedRoute>
            <ProtectedRoute path='/user'>
              <UserProfile questionnaire={<div>Q modal</div>}/>
            </ProtectedRoute>
            <ProtectedRoute path='/whisks/search'>
              <SearchResults />
            </ProtectedRoute>
            <ProtectedRoute path='/whisks/:id'>
              <WhiskDetails />
            </ProtectedRoute>
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
