import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, Tab, Grid } from '@material-ui/core';
import CardVertical from '../CardVertical';
import filteredWhisks from './dummyData';
import { BrowserView, MobileView } from 'react-device-detect';
import { Link } from 'react-router-dom';
import WhiskTabs from '../WhiskTabs';

export default function SuggestedWhisks() {
  const classes = useStyles();
  const [value, setValue] = useState('food');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log('value', value);
    //add filtering logic
  }, [value]);

  return (
    <>
      <div className='suggested-whisks'>
        <WhiskTabs
          value={value}
          onChange={handleChange}
          variant='fullWidth'
          aria-label='whisk categories'
          className='tabs'
        >
          <Tab label='Food' value='food' />
          <Tab label='Outdoors' value='outdoor' />
          <Tab label='Adventure' value='adventure' />
        </WhiskTabs>

        {/* If viewing from Mobile, display horizontal scrolling, one row only */}
        <MobileView>
          <div className='mobile'>
            <GridList className={classes.gridList}>
              {filteredWhisks.map((whisk) => (
                <div key={whisk.id}>
                  <CardVertical whisk={whisk} />
                </div>
              ))}
            </GridList>
          </div>
        </MobileView>

        {/* If in browser, display multiple rows, no horizontal scrolling */}
        <BrowserView>
          <Grid
            container
            justify='flex-start'
            spacing={2}
            className={classes.browser}
          >
            {filteredWhisks.map((whisk, i) => (
              <Grid item key={whisk.id}>
                <Link to={`/whisks/${whisk.id}`}>
                  <CardVertical whisk={whisk} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </BrowserView>
      </div>
    </>
  );
}

//GridList styles not working in SASS
const useStyles = makeStyles((theme) => ({
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    backgroundColor: '#f2f2f2',
    height: '18em',
  },
  // browser: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-between',
  // },
}));
