import { useContext, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { isMobile } from 'react-device-detect';

import Search from '../components/welcome/Search';

import SuggestedWhisks from '../components/welcome/SuggestedWhisks';
import UserContext from '../context/user/userContext';
import LandingPage from './LandingPage';
import WhiskContext from '../context/whisk/whiskContext';
import Spinner from '../components/Spinner';

const Welcome = () => {
  const userContext = useContext(UserContext);
  const whiskContext = useContext(WhiskContext);
  const {
    loading,
    setLoadingTrue,
    scanWhisks,
    whisks,
    setLoadingFalse,
  } = whiskContext;

  useEffect(() => {
    if (whisks && whisks.length) {
      setLoadingFalse();
    } else {
      setLoadingTrue();
      scanWhisks();
    }
    // eslint-disable-next-line
  }, [whisks]);

  if (!userContext.isAuthenticated) return <LandingPage />;
  else if (loading) return <Spinner />;
  else
    return (
      <Container className='welcome-page'>
        <div className='landing-title'>
          <h1>
            Experiences {isMobile && <br />}
            for you
          </h1>
        </div>
        <Search />
        <SuggestedWhisks whisks={whisks} />
      </Container>
    );
};

export default Welcome;
