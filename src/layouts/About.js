import React, { useEffect, useContext } from 'react';
import UserContext from '../context/user/userContext';
import WhiskContext from '../context/whisk/whiskContext';

const About = () => {
  const userContext = useContext(UserContext);
  const whiskContext = useContext(WhiskContext);
  const { user } = userContext;

  useEffect(() => {
    (async () => {
      //await userContext.saveMatchDataToContext(user);
      await userContext.getAllUsers();
      console.log('matches in context 3️⃣', userContext.matches);
    })();
  }, []);
  return <div>This is a page for testing</div>;
};

export default About;
