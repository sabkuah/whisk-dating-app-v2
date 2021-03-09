import { Container, Typography } from '@material-ui/core';
import { isIOS, isAndroid } from 'react-device-detect';
import BottomNav from '../components/landing/BottomNav';
import Search from '../components/landing/Search';
import BurgerNav from '../components/landing/BurgerNav';
import SuggestedWhisks from '../components/landing/SuggestedWhisks';

const Welcome = () => {
  return (
    <Container className='welcome-page'>
      {isAndroid && <BurgerNav />}
      <div className='landing-title'>
        <h1>
          Experiences <br />
          for you
        </h1>
      </div>
      <Search />
      <SuggestedWhisks />
      {isIOS && <BottomNav />}
    </Container>
  );
};

export default Welcome;
