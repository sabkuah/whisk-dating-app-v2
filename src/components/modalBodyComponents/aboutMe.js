import React from 'react';
import {Button, Typography, TextField } from '@material-ui/core';

const AboutMe = ({submit, handleChange, user}) => {
  return (
    <form onSubmit={submit} id="profile-form">
      <Typography variant="h5" style={{paddingBottom: "1em"}}>Complete My Profile</Typography>
      <TextField
        label='First Name'
        onChange={(e) => handleChange('fName', e.target.value)}
        className='text-field'
        defaultValue={user?.fName}
      />
      <TextField
        label='Last Name'
        onChange={(e) => handleChange('lName', e.target.value)}
        className='text-field'
        defaultValue={user?.lName}
      />
      <TextField
        label='Age'
        onChange={(e) => handleChange('age', e.target.value)}
        className='text-field'
        type="number"
        defaultValue={user?.age}
      />
      <TextField
        label='Phone'
        onChange={(e) => handleChange('phone', e.target.value)}
        className='text-field'
        defaultValue={user?.phone}
      />
      <TextField label="Bio" multiline rows={4} className='text-field' placeholder="Tell us about yourself" onChange={(e) => handleChange('bio', e.target.value)}  defaultValue={user?.bio} />
      
      <TextField label="Interests" multiline rows={2} className='text-field' placeholder="What are your hobbies" onChange={(e) => handleChange('interests', e.target.value)} defaultValue={user?.interests} />
       <Button className='submit-btn' type='submit'>
        Save
      </Button>
    </form>
  )
}

export default AboutMe