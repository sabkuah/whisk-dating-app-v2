import React, { useContext, useEffect } from 'react';
import CardHorizontal from '../components/CardHorizontal';
import UserContext from '../context/user/userContext';

const ChosenWhisks = () => {
  //const [userMatches, setUserMatches] = useState([]);
  const userContext = useContext(UserContext);
  const { user } = userContext;

  useEffect(() => {
    console.log("user's matches", user.Matches);
    // (async () => {
    //   const userInfo = await getUser(user.sub);
    //   console.log('user info>>', userInfo);
    //   setUserMatches(userInfo.Matches);
    // })();
  }, []);

  return (
    <div className='chosen-whisks'>
      {user.Matches.length ? (
        <div>
          {user.map((match) => {
            return <CardHorizontal match={match} key={match.ID} />;
          })}
        </div>
      ) : (
        <h1>No Chosen Whisks. Go out and get some! </h1>
      )}
    </div>
  );
};

export default ChosenWhisks;
