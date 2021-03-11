import UserState from './context/user/UserState';
import WhiskState from './context/whisk/WhiskState';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChosenWhisks from './layouts/ChosenWhisks';
import UserProfile from './layouts/UserProfile';
import Welcome from './layouts/Welcome';
import Navigation from './components/Navigation';
import { BrowserView } from 'react-device-detect';
import WhiskDetails from './layouts/WhiskDetails';
import SearchResults from './layouts/SearchResults';
import Login from './components/Login';

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
              <UserProfile />
            </Route>
            <Route path='/user/whisks'>
              <ChosenWhisks />
            </Route>
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
