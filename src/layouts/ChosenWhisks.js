import React, { useContext, useState, useEffect } from 'react';
import CardHorizontal from '../components/CardHorizontal';
import UserContext from '../context/user/userContext';

const ChosenWhisks = () => {
  const [userMatches, setUserMatches] = useState([]);
  const userContext = useContext(UserContext);
  const { user, getUser } = userContext;

  useEffect(() => {
    //console.log('user stored in CW>>>', user);
    (async () => {
      const userInfo = await getUser(user.sub);
      console.log('user info>>', userInfo);
      setUserMatches(userInfo.Matches);
    })();
  }, []);

  return (
    <div className='chosen-whisks'>
      {userMatches.length ? (
        <div>
          {userMatches.map((match) => {
            <CardHorizontal match={match} />;
          })}
        </div>
      ) : (
        <h1>No Chosen Whisks. Go out and get some! </h1>
      )}
    </div>
  );
};

export default ChosenWhisks;
