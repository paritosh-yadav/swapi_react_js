import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { withRouter } from "react-router-dom";

const root = {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
}
const input = {
    marginLeft: 8,
    flex: 1,
}
const AppBarStyle = {
    flexDirection: 'row',
    justifyContent: 'space-around'
}
const loadingStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
}

let LandingPageView = (props) => {
    let {setSearchTerm, isFetching, searchedCity, history} = props
    return (
        <div>
            <AppBar position="static" style={AppBarStyle}>
                <Paper style={root} elevation={1}>
                    <InputBase
                        style={input}
                        onChange={setSearchTerm}
                        placeholder="Type to search for planet..." />
                </Paper>
                <Button onClick={()=>{history.replace('/')}} color="inherit">Logout</Button>
            </AppBar>
            {isFetching &&
                <div style={loadingStyle}>
                    <p style={{ fontSize: 14 }}>Searching...</p>
                </div>
            }
            {searchedCity &&
                <List>
                    {
                        searchedCity.map((l, index) => (
                            <ListItem key={index}>
                                <span>{l.name}</span>
                            </ListItem>
                        ))
                    }
                </List>
            }
        </div>
    )
}
export default withRouter(LandingPageView);