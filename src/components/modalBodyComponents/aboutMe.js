import React, { useContext } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Typography, TextField, Select } from '@material-ui/core';
import UserContext from '../../context/user/userContext';

const AboutMe = ({submit, handleChange }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext

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
      <FormControl className='text-field'>
        <InputLabel id="select-label">Gender</InputLabel>
        <Select labelId="demo-simple-select-label "id="demo-simple-select"
          value={user?.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
        >
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
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