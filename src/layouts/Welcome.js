import { useContext } from 'react';
import { Container } from '@material-ui/core';
import { isIOS, isAndroid, isMobile } from 'react-device-detect';
import BottomNav from '../components/welcome/BottomNav';
import Search from '../components/welcome/Search';
import BurgerNav from '../components/welcome/BurgerNav';
import SuggestedWhisks from '../components/welcome/SuggestedWhisks';
import UserContext from '../context/user/userContext';
import LandingPage from './LandingPage';

const Welcome = () => {
  const userContext = useContext(UserContext);

  return (
    userContext.isAuthenticated ? 
      <Container className='welcome-page'>
        {isAndroid && <BurgerNav />}
            <div className='landing-title'>
              <h1>
                Experiences {isMobile && <br />}
                for you
              </h1>
            </div>
            <Search />
            <SuggestedWhisks />
        {isIOS && <BottomNav />}
      </Container>
      : 
      <LandingPage/>
  );
};

export default Welcome;
