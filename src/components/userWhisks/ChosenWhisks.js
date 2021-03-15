import React, { useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Avatar,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';

const ChosenWhisks = ({ whisks, handleCancelWhisk }) => {
  const classes = useStyles();

  return (
    <div className='chosen-whisks'>
      <h1>Your Chosen Whisks</h1>
      {whisks?.length ? (
        <List className={classes.root}>
          {whisks.map((w) => {
            return (
              <div key={w.ID} className='chosen-list-item'>
                <ListItem alignItems='center'>
                  <ListItemAvatar>
                    <Avatar alt={w.title} src={w.images[0]} />
                  </ListItemAvatar>
                  <ListItemText primary={w.title} />
                  <Button
                    onClick={() => {
                      handleCancelWhisk(w.ID);
                    }}
                  >
                    <CancelIcon className='cancel-icon' />
                  </Button>
                </ListItem>
                <Divider variant='inset' component='li' />{' '}
              </div>
            );
          })}
        </List>
      ) : (
        <p>No Chosen Whisks. Go out and get some! </p>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default ChosenWhisks;
