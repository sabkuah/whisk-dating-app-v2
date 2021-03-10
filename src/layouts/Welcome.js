import { Container } from '@material-ui/core';
import { isIOS, isAndroid, isMobile } from 'react-device-detect';
import BottomNav from '../components/welcome/BottomNav';
import Search from '../components/welcome/Search';
import BurgerNav from '../components/welcome/BurgerNav';
import SuggestedWhisks from '../components/welcome/SuggestedWhisks';

const Welcome = () => {
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
      <SuggestedWhisks />
      {isIOS && <BottomNav />}
    </Container>
  );
};

export default Welcome;
