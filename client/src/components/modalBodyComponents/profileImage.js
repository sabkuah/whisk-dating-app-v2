import React, {useContext } from 'react';
import {Button, Typography, TextField } from '@material-ui/core';
import UserContext from '../../context/user/userContext';

const DP = ({submit, handleChange }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext

  return (
    <form onSubmit={submit}>
      <Typography variant="h5" style={{paddingBottom: "1em"}}>Update Profile Image</Typography>
      <TextField
          label='Profile Image'
          placeholder="Place image URL here"
          onChange={(e) => handleChange('profileImage', e.target.value)}
          className='text-field'
          type="url"
          defaultValue={user?.profileImage}
        />
        <Button className='submit-btn' type='submit'>
          Save
        </Button>
    </form>
  )
}

export default DP