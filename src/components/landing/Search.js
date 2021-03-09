import React from 'react';
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
        <InputBase className='input' placeholder='Search' />
      </Paper>
    </div>
  );
};

export default Search;
