import React, { useState } from 'react';
import {
  Container,
  IconButton,
  Divider,
  InputBase,
  Paper,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  //const query = 'dummydata';
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    console.log('query', query);
  };

  return (
    <Container className='search-results'>
      <div className='top-nav'>
        <IconButton aria-label='back'>
          <Link to='/'>
            <ArrowBackIosIcon />
          </Link>
        </IconButton>
        <div className='search'>
          <Paper component='form' className='search-bar'>
            <IconButton className='iconButton' aria-label='search'>
              <SearchIcon />
            </IconButton>
            <Divider className='divider' orientation='vertical' />
            <InputBase
              className='input'
              placeholder='Search'
              autoFocus={true}
              onChange={(e) => {
                handleSearch(e);
              }}
            />
          </Paper>
        </div>
      </div>
    </Container>
  );
};

export default SearchResults;
