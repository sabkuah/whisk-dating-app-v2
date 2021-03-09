import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

const Navigation = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position='static' className={classes.container}>
      <Toolbar>
        <Typography
          variant='h3'
          className={classes.title}
          id='title-logo'
          onClick={() => history.push('/')}
        >
          Whisk
        </Typography>
        <Link to='/login' style={{ textDecoration: 'none' }}>
          Login
        </Link>
        {/* <Button>Login</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'white',
    padding: '1em 2em',
  },
  title: {
    flexGrow: 1,
    color: 'black',
  },
}));
