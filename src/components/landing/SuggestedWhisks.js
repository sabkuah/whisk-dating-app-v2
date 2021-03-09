import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, Tab, Tabs } from '@material-ui/core';
import CardVertical from '../CardVertical';
import filteredWhisks from './dummyData';
import { BrowserView, MobileView } from 'react-device-detect';

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
        <Tabs
          value={value}
          onChange={handleChange}
          variant='fullWidth'
          indicatorColor='#00d1ff'
          textColor='#00d1ff'
          aria-label='whisk categories'
          className='tabs'
        >
          <Tab label='Food' value='food' />
          <Tab label='Outdoors' value='outdoor' />
          <Tab label='Adventure' value='adventure' />
        </Tabs>

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
          <div className={classes.browser}>
            {filteredWhisks.map((whisk) => (
              <div key={whisk.id}>
                <CardVertical whisk={whisk} />
              </div>
            ))}
          </div>
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
  browser: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}));
