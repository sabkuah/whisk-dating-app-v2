import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const Search = () => {
  return (
    <div className='search'>
      <Paper component='form' className='search-bar'>
        <IconButton className='iconButton' aria-label='search'>
          <SearchIcon />
        </IconButton>
        <Divider className='divider' orientation='vertical' />
        <InputBase
          className='input'
          placeholder='Search'
          inputProps={{ 'aria-label': 'search google maps' }}
        />
      </Paper>
    </div>
  );
};

export default Search;
