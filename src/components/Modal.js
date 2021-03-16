import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';

export default function UserModal({ body, open, handleClose }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="user-modal">
        <div style={modalStyle} className={classes.paper}>
          <div className="close-wrapper">
            <CloseIcon onClick={handleClose}/>
          </div>
          {body}
        </div>
      </Modal>
    </div>
  );
}

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '40vw',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "20px",
    "&:focus": {
      outline: 'none'
    }
  },
}));