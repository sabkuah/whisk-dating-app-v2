import UserState from './context/user/UserState';
import WhiskState from './context/whisk/WhiskState';

function App() {
  return (
    <UserState>
      <WhiskState>
        <div className='App'>
          <h1>Welcome to our new dating app!</h1>
        </div>
      </WhiskState>
    </UserState>
  );
}

export default App;
