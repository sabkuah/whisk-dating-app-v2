import React, { useState } from 'react';
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function WhiskSnackbar({ open, message }) {
  const [state, setState] = useState(open)

  const handleClose = () => {
    setState(false);
  };

  return (
    <div>
      <Snackbar
        id="whiskSnackBar"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={state}
        onClose={handleClose}
        message={message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}
