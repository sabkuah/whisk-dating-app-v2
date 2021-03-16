import React from 'react';
import {Button, Typography, TextField } from '@material-ui/core';

const DP = ({submit, handleChange, user}) => {
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