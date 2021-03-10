import React, { useState } from 'react';
import {
  Container,
  IconButton,
  Divider,
  InputBase,
  Paper,
  Grid,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import CardHorizontal from '../components/CardHorizontal';

const SearchResults = () => {
  //const query = 'dummydata';
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(dummyData);

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

const dummyData = [
  {
    id: 1017,
    title: 'Brewery Crawl Around East Van',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ14dH_K9fffbCAeQ2Q2GHGoKsqq-sRx70lQ&usqp=CAU',
    ],
    description:
      'This is a normal length string. Enjoy a brief stroll through the Mt.Pleasant neighbourhood while sipping on coffee from local roasters.  ',
    durationHours: 2,
    participants: 2,
  },
  {
    id: 1027,
    title: 'Fish n Chips in Steveston',
    images: [
      'https://www.thespruceeats.com/thmb/hToYLa2CWDEZKNX4VROsCSE3K0M=/1500x1000/filters:fill(auto,1)/best-fish-and-chips-recipe-434856-Hero-5b61b89346e0fb00500f2141.jpg',
    ],
    description:
      'This is a super long string. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, assumenda illum, deserunt at saepe laborum deleniti harum omnis amet delectus eius sequi unde numquam iste vel, totam similique dolor culpa.',
    durationHours: 2,
    participants: 2,
  },
  {
    id: 1037,
    title: 'Coffee Date in Mt. Pleasant',
    images: [
      'https://res.cloudinary.com/fittco/image/upload/v1557509574/cshp6bekdicl5v7wqlgq.jpg',
    ],
    description: 'This is a short line',
    durationHours: 2,
    participants: 2,
  },
];

export default SearchResults;
