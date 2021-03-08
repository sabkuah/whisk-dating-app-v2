import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, CardContent, CardHeader, IconButton, Tab, Tabs, TextField } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const [tab, setTab] = useState(0)
  const [username, setUsername] = useState("")
  const [password, setPW] = useState("")
  const [email, setEmail] = useState("")
  const history = useHistory()

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const classes = useStyles()

  const submitForm = async (e) => {
    e.preventDefault()
    // if (tab === 1 ) {
    //   // register
    //   const newUser = await register({email, username, password})
    //   !!newUser ? setToken(newUser.accessToken) : setToken("")
    //   history.push(`/`)
    // } else {
    //   //login
    //   const user = await login({email, password})
    //   if (!!user?.accessToken) {
    //     setToken(user.accessToken)
    //     history.push(`/`)
    //   } else {
    //     setToken("")
    //   }
    // }
  }

  return (
    <Card className={classes.root}>
      <CardHeader title="Login" action={
        <IconButton aria-label="close">
          <CloseIcon/>
        </IconButton>
      }/>
      <CardContent>
        <form onSubmit={submitForm}>
          <Tabs value={tab} onChange={handleChange} aria-label="login tabs">
            <Tab label="Login" style={{width: "50%"}}/>
            <Tab label="Register" style={{width: "50%"}}/>
          </Tabs>
          <TabPanel value={tab} index={0}>
            <TextField label="Email" variant="filled" onChange={e => setEmail(e.target.value)} className={classes.field}/>
            <TextField label="Password" onChange={e => setPW(e.target.value)} type="password" variant="filled" className={classes.field}/>
            <Button type="submit" style={{width: "50%"}}>Login</Button>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <TextField label="Email" variant="filled" onChange={e => setEmail(e.target.value)} className={classes.field}/>
            <TextField label="Username" variant="filled" onChange={e => setUsername(e.target.value)} className={classes.field}/>
            <TextField label="Password" type="password" onChange={e => setPW(e.target.value)} variant="filled" className={classes.field}/>
            <Button type="submit" style={{width: "50%"}}>Register</Button>
          </TabPanel>
          </form>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    textAlign: "center",
    display: "block",
    margin: "0 auto"
  },
  field: {
    width: "100%",
    marginBottom: "1em"
  }
})

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default Login


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {
        value === index && 
        <div style={{paddingTop: "1em"}}>{children}</div>
      }
    </div>
  );
}