import { useContext, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { isIOS, isAndroid, isMobile } from 'react-device-detect';
import BottomNav from '../components/welcome/BottomNav';
import Search from '../components/welcome/Search';
import BurgerNav from '../components/welcome/BurgerNav';
import SuggestedWhisks from '../components/welcome/SuggestedWhisks';
import UserContext from '../context/user/userContext';
import LandingPage from './LandingPage';
import WhiskContext from '../context/whisk/whiskContext';
import Spinner from '../components/Spinner';

const Welcome = () => {
  const userContext = useContext(UserContext);
  const whiskContext = useContext(WhiskContext);
  const { loading, setLoadingTrue, scanWhisks, whisks } = whiskContext;

  useEffect(() => {
    setLoadingTrue();
    scanWhisks();
    // eslint-disable-next-line
  }, []);

  if (!userContext.isAuthenticated) return <LandingPage />;
  else if (loading) return <Spinner />;
  else
    return (
      <Container className='welcome-page'>
        {isAndroid && <BurgerNav />}
        <div className='landing-title'>
          <h1>
            Experiences {isMobile && <br />}
            for you
          </h1>
        </div>
        <Search />
        <SuggestedWhisks whisks={whisks} />
        {isIOS && <BottomNav />}
      </Container>
    );
};

export default Welcome;
