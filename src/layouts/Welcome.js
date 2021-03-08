import { Container } from '@material-ui/core';

import BottomNav from '../components/landing/BottomNav';
import Search from '../components/landing/Search';
import LandingNav from '../components/landing/LandingNav';
import SuggestedWhisks from '../components/landing/SuggestedWhisks';

const Welcome = () => {
  return (
    <Container className='welcome-page'>
      <LandingNav />
      <h2>
        Experiences <br />
        for you
      </h2>
      <Search />
      <SuggestedWhisks />
      <BottomNav />
    </Container>
  );
};

export default Welcome;
