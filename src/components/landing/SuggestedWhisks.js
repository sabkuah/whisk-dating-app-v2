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
          aria-label='icon tabs example'
          className='tabs'
        >
          <Tab label='Food' value='food' />
          <Tab label='Outdoors' value='outdoor' />
          <Tab label='Adventure' value='adventure' />
        </Tabs>
      </div>

      {/* If viewing from Mobile, display horizontal scrolling, one row only */}
      <MobileView>
        <div className={classes.root}>
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
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    //backgroundColor: '#00d1ff',
    height: 'auto',
    alignItems: 'center',
    color: '#00d1ff',
  },
  browser: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    backgroundColor: '#f2f2f2',
    height: '18em',
  },
}));
