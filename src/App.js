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
import BurgerNav from './components/welcome/BurgerNav';
import BottomNav from './components/welcome/BottomNav';
import { isIOS, isAndroid } from 'react-device-detect';
import UserProfileController from './controllers/UserProfileController';

Amplify.configure(config);

function App() {
  return (
    <UserState>
      <WhiskState>
        <Router>
          <BrowserView>
            <Navigation />
          </BrowserView>
          {isAndroid && <BurgerNav />}
          {isIOS && <BottomNav />}
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route path='/login' component={Login} />
            <ProtectedRoute path='/user/whisks' component={UserWhisks} />
            <ProtectedRoute path='/user/match/:id' component={Match} />
            <ProtectedRoute path='/user' component={UserProfileController}/>
            <ProtectedRoute path='/whisks/search' component={SearchResults} />
            <ProtectedRoute path='/whisks/:id' component={WhiskDetails} />
          </Switch>
        </Router>
      </WhiskState>
    </UserState>
  );
}

export default App;
