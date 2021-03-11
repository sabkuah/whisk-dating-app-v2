import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

const Search = () => {
  const history = useHistory();

  return (
    <div className='search'>
      <Paper component='form' className='search-bar'>
        <IconButton className='iconButton' aria-label='search'>
          <SearchIcon />
        </IconButton>

        <InputBase
          className='input'
          placeholder='Search'
          onClick={() => {
            history.push('/whisks/search');
          }}
        />
      </Paper>
    </div>
  );
};

export default Search;
