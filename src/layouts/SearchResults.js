import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  IconButton,
  InputBase,
  Paper,
  Grid,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import CardHorizontal from '../components/CardHorizontal';
import WhiskContext from '../context/whisk/whiskContext';

const SearchResults = () => {
  const whiskContext = useContext(WhiskContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  //triggered when query is entered
  useEffect(() => {
    const filtered = whiskContext.whisks.filter((w) => {
      return w.title.toLowerCase().includes(query.toLowerCase());
    });
    setResults(filtered);
  }, [query, whiskContext.whisks]);

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
            <InputBase
              className='input'
              placeholder='Search'
              autoFocus={true}
              onChange={(e) => {
                setQuery(e.target.value);
                console.log(query);
              }}
            />
          </Paper>
        </div>
      </div>
      <div className='results'>
        <Grid container spacing={3}>
          {results.length ? (
            results.map((whisk) => (
              <Grid item xs={12} sm={6} md={4} key={whisk.id}>
                <CardHorizontal whisk={whisk} />
              </Grid>
            ))
          ) : (
            <h2>No Whisks found! </h2>
          )}
        </Grid>
      </div>
    </Container>
  );
};

export default SearchResults;
