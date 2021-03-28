import React, { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from '../context/user/userContext';
import Spinner from './Spinner';
import WhiskContext from '../context/whisk/whiskContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userContext = useContext(UserContext);
  const whiskContext = useContext(WhiskContext);
  const {
    getAuthenticatedUser,
    user,
    users,
    loading,
    scanUsers,
    setLoadingTrue,
    setLoadingFalse,
  } = userContext;
  const { whisks, scanWhisks } = whiskContext;

  useEffect(() => {
    (async () => {
      setLoadingTrue();
      await getAuthenticatedUser();
      if (!users) {
        await scanUsers();
      }
      if (!whisks) {
        await scanWhisks();
      }
      setLoadingFalse();
      return;
    })();
    //eslint-disable-next-line
  }, []);

    return (
      loading === true ? <Spinner /> :
      <Route
        {...rest}
        render={props => {
          if (user) {
            return <Component {...rest} {...props} />
          } else {
            return <Redirect to='/' /> // can't be '/login' for redirect for some reason // can add redirect page *stretch*
          }
        }}
      />
    );
};

export default ProtectedRoute;

// https://dev.to/mychal/protected-routes-with-react-function-components-dh#:~:text=Protected%20routes%20allow%20us%20to,may%20contain%20private%20user%20information.


// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const history = useHistory();
//   async function checkAuthState() {
//     try {
//       await Auth.currentAuthenticatedUser()
//     } catch (err) {
//       history.push("/login")
//     }
//   }
//   useEffect(() => {
//     checkAuthState()
//   })
//   return <Component {...rest} />
// };

// export default ProtectedRoute;