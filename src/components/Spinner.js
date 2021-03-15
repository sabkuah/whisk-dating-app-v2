import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
//import loadingWhisk from '../assets/whisk-loading.gif';

const Spinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.spinner} />
      {/* <img src={loadingWhisk} alt='loading' className={classes.gif} /> */}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  spinner: {
    marginTop: '3%',
    color: '#00d1ff',
  },
  // gif: {
  //   width: '20%',
  // },
}));

export default Spinner;
