import { Container, Typography } from '@material-ui/core';
import { isIOS, isAndroid, isMobile } from 'react-device-detect';
import BottomNav from '../components/landing/BottomNav';
import Search from '../components/landing/Search';
import BurgerNav from '../components/landing/BurgerNav';
import SuggestedWhisks from '../components/landing/SuggestedWhisks';

const Welcome = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

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
